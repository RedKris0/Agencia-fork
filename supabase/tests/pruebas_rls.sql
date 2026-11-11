-- Pruebas de las políticas de seguridad (Row Level Security) del esquema base.
-- Cada prueba intenta ROMPER una regla de privacidad y verifica que la base lo impide.
-- Todos los datos son ficticios.
--
-- Cómo correrlas: ver supabase/tests/README.md
\set ON_ERROR_STOP on
\set QUIET on
set client_min_messages = warning;

-- -----------------------------------------------------------------------------
-- Herramientas de prueba
-- -----------------------------------------------------------------------------
create schema prueba;
grant usage on schema prueba to anon, authenticated;

create function prueba.afirmar(condicion boolean, descripcion text) returns void
language plpgsql as $$
begin
  if condicion is not true then
    raise exception 'FALLA: %', descripcion;
  end if;
  raise notice 'ok  %', descripcion;
end $$;

-- Ejecuta una instrucción que DEBE ser rechazada.
create function prueba.debe_fallar(instruccion text, descripcion text) returns void
language plpgsql as $$
begin
  begin
    execute instruccion;
  exception when others then
    raise notice 'ok  %  (rechazado: %)', descripcion, sqlerrm;
    return;
  end;
  raise exception 'FALLA: % (la instrucción no fue rechazada)', descripcion;
end $$;

-- Cuenta filas visibles para el rol y usuario actuales.
create function prueba.contar(instruccion text) returns bigint
language plpgsql as $$
declare n bigint;
begin
  execute 'select count(*) from (' || instruccion || ') t' into n;
  return n;
end $$;

grant execute on all functions in schema prueba to anon, authenticated;
set client_min_messages = notice;

-- -----------------------------------------------------------------------------
-- Datos ficticios (como administrador, igual que los scripts de carga)
-- -----------------------------------------------------------------------------
insert into auth.users (id, email) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'ana@ejemplo.cl'),           -- estudiante adulta
  ('bbbbbbbb-0000-0000-0000-000000000002', 'benja@ejemplo.cl'),         -- estudiante menor de edad
  ('cccccccc-0000-0000-0000-000000000003', 'admision-x@ejemplo.cl'),    -- miembro institución X
  ('dddddddd-0000-0000-0000-000000000004', 'admision-y@ejemplo.cl');    -- miembro institución Y

insert into fuente (id, organismo, nombre, url) values
  ('f0000000-0000-0000-0000-000000000001', 'Fuente ficticia', 'Base de prueba', 'https://ejemplo.cl');

insert into institucion (id, codigo_oficial, nombre, tipo) values
  ('10000000-0000-0000-0000-000000000001', '0001', 'Instituto X (ficticio)', 'instituto_profesional'),
  ('10000000-0000-0000-0000-000000000002', '0002', 'Instituto Y (ficticio)', 'instituto_profesional');

insert into programa_generico (id, institucion_id, nombre, nombre_normalizado, fuente_id) values
  ('20500000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Carrera ficticia', 'carrera ficticia', 'f0000000-0000-0000-0000-000000000001');

insert into programa (id, institucion_id, nombre, nombre_oficial, nombre_normalizado, fuente_id) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Carrera ficticia', 'Carrera ficticia', 'carrera ficticia', 'f0000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Otra carrera ficticia', 'Otra carrera ficticia', 'otra carrera ficticia', 'f0000000-0000-0000-0000-000000000001');

-- La misma carrera en dos jornadas: dos variantes de un solo programa (ADR 0011).
insert into programa_variante (id, programa_id, programa_generico_id, codigo_sies, codigo_demre, sede, jornada, fuente_id) values
  ('21000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '20500000-0000-0000-0000-000000000001', 'P001D', '13073', 'Sede ficticia', 'diurna', 'f0000000-0000-0000-0000-000000000001'),
  ('21000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', '20500000-0000-0000-0000-000000000001', 'P001V', null, 'Sede ficticia', 'vespertina', 'f0000000-0000-0000-0000-000000000001');

insert into organizacion (id, nombre, tipo, institucion_id) values
  ('30000000-0000-0000-0000-000000000001', 'Institución X', 'institucion', '10000000-0000-0000-0000-000000000001'),
  ('30000000-0000-0000-0000-000000000002', 'Institución Y', 'institucion', '10000000-0000-0000-0000-000000000002');

insert into miembro (organizacion_id, usuario_id, rol) values
  ('30000000-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000003', 'acompanante'),
  ('30000000-0000-0000-0000-000000000002', 'dddddddd-0000-0000-0000-000000000004', 'acompanante');

-- =============================================================================
\echo '--- 1. Datos públicos'
-- =============================================================================
set role anon;
select prueba.afirmar(prueba.contar('select * from programa') = 2, 'un visitante sin sesión ve las carreras');
select prueba.afirmar(prueba.contar('select * from programa_generico') = 1, 'un visitante sin sesión ve las carreras genéricas');
select prueba.afirmar(prueba.contar('select * from programa_variante') = 2, 'un visitante sin sesión ve las sedes y jornadas');
select prueba.debe_fallar($$insert into programa (institucion_id, nombre, nombre_oficial, fuente_id)
  values ('10000000-0000-0000-0000-000000000001', 'Falsa', 'Falsa', 'f0000000-0000-0000-0000-000000000001')$$,
  'un visitante sin sesión no puede crear carreras');
select prueba.debe_fallar($$insert into programa_variante (programa_id, codigo_sies, fuente_id)
  values ('20000000-0000-0000-0000-000000000001', 'P999', 'f0000000-0000-0000-0000-000000000001')$$,
  'un visitante sin sesión no puede crear sedes ni jornadas');
select prueba.debe_fallar($$insert into programa_generico (institucion_id, nombre, nombre_normalizado, fuente_id)
  values ('10000000-0000-0000-0000-000000000001', 'Falsa', 'falsa', 'f0000000-0000-0000-0000-000000000001')$$,
  'un visitante sin sesión no puede crear carreras genéricas');
select prueba.debe_fallar('select * from persona', 'un visitante sin sesión no puede leer personas');
reset role;

-- =============================================================================
\echo '--- 2. Cada persona es dueña de sus datos'
-- =============================================================================
set role authenticated;
select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-0000-0000-000000000001', false);
insert into persona (id, nombre, fecha_nacimiento, region) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Ana Prueba', current_date - interval '20 years', 'O''Higgins');
insert into ficha_trayectoria (persona_id) values ('aaaaaaaa-0000-0000-0000-000000000001');
select prueba.afirmar(prueba.contar('select * from persona') = 1, 'Ana ve su propio registro');
select prueba.debe_fallar($$insert into persona (id, nombre, fecha_nacimiento)
  values ('bbbbbbbb-0000-0000-0000-000000000002', 'Suplantación', '2000-01-01')$$,
  'Ana no puede crear un registro a nombre de otra persona');

select set_config('request.jwt.claim.sub', 'bbbbbbbb-0000-0000-0000-000000000002', false);
insert into persona (id, nombre, fecha_nacimiento, region) values
  ('bbbbbbbb-0000-0000-0000-000000000002', 'Benja Prueba', current_date - interval '17 years', 'Maule');
select prueba.afirmar(prueba.contar('select * from persona') = 1, 'Benja ve solo su registro, no el de Ana');
select prueba.afirmar(prueba.contar('select * from ficha_trayectoria') = 0, 'Benja no ve la ficha de Ana');

-- =============================================================================
\echo '--- 3. Las instituciones solo ven con consentimiento vigente'
-- =============================================================================
select set_config('request.jwt.claim.sub', 'cccccccc-0000-0000-0000-000000000003', false);
select prueba.afirmar(prueba.contar('select * from persona') = 0, 'la institución X no ve a nadie sin consentimiento');

select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-0000-0000-000000000001', false);
insert into consentimiento (persona_id, organizacion_id, finalidad) values
  ('aaaaaaaa-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'compartir_ficha');

select set_config('request.jwt.claim.sub', 'cccccccc-0000-0000-0000-000000000003', false);
select prueba.afirmar(prueba.contar('select * from persona') = 1, 'con consentimiento, X ve a Ana');
select prueba.afirmar(prueba.contar('select * from ficha_trayectoria') = 1, 'con consentimiento, X ve la ficha de Ana');
select prueba.afirmar(prueba.contar($$select * from persona where id = 'bbbbbbbb-0000-0000-0000-000000000002'$$) = 0,
  'X sigue sin ver a Benja, que no le dio consentimiento');

select set_config('request.jwt.claim.sub', 'dddddddd-0000-0000-0000-000000000004', false);
select prueba.afirmar(prueba.contar('select * from persona') = 0, 'la institución Y no ve a Ana: el consentimiento fue solo para X');
select prueba.afirmar(prueba.contar('select * from consentimiento') = 0, 'Y no ve consentimientos dirigidos a X');

-- =============================================================================
\echo '--- 4. Revocar es inmediato y queda en el historial'
-- =============================================================================
select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-0000-0000-000000000001', false);
update consentimiento set revocado_el = now() where finalidad = 'compartir_ficha';

select set_config('request.jwt.claim.sub', 'cccccccc-0000-0000-0000-000000000003', false);
select prueba.afirmar(prueba.contar('select * from persona') = 0, 'tras revocar, X deja de ver a Ana');

select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-0000-0000-000000000001', false);
update consentimiento set revocado_el = null;   -- intento de "des-revocar": la regla no deja tocar filas revocadas
select prueba.afirmar(prueba.contar('select * from consentimiento where revocado_el is null') = 0,
  'un consentimiento revocado no se puede "des-revocar"');
select prueba.debe_fallar($$update consentimiento set finalidad = 'datos_socioeconomicos'$$,
  'no se puede cambiar la finalidad de un consentimiento ya otorgado');
select prueba.debe_fallar($$delete from consentimiento$$,
  'un consentimiento no se borra: se revoca y queda en el historial');
select prueba.afirmar(prueba.contar('select * from consentimiento') = 1, 'el consentimiento revocado sigue en el historial de Ana');

-- =============================================================================
\echo '--- 5. Menores de 18 necesitan autorización de su tutor'
-- =============================================================================
select set_config('request.jwt.claim.sub', 'bbbbbbbb-0000-0000-0000-000000000002', false);
select prueba.debe_fallar($$insert into consentimiento (persona_id, organizacion_id, finalidad)
  values ('bbbbbbbb-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', 'compartir_ficha')$$,
  'Benja (17 años) no puede compartir su ficha sin autorización de su tutor');
-- El menor no puede declararse a sí mismo la autorización de su tutor (ADR 0022).
select prueba.debe_fallar($$insert into autorizacion_tutor (persona_id, nombre_tutor, contacto_tutor, metodo)
  values ('bbbbbbbb-0000-0000-0000-000000000002', 'Yo mismo', 'yo@ejemplo.cl', 'correo confirmado')$$,
  'Benja no puede declararse a sí mismo la autorización de su tutor');
select prueba.afirmar(prueba.contar('select * from autorizacion_tutor') = 0,
  'sin autorización registrada por el servidor, Benja no ve ninguna');
-- La autorización la registra el servidor (rol de servicio) después de confirmar con el adulto.
reset role;
set role service_role;
insert into autorizacion_tutor (persona_id, nombre_tutor, contacto_tutor, metodo)
  values ('bbbbbbbb-0000-0000-0000-000000000002', 'Tutora Prueba', 'tutora@ejemplo.cl', 'correo confirmado');
reset role;
set role authenticated;
select prueba.afirmar(prueba.contar('select * from autorizacion_tutor') = 1,
  'Benja ve la autorización que registró el servidor');
select prueba.debe_fallar($$update autorizacion_tutor set nombre_tutor = 'Otra persona'
  where persona_id = 'bbbbbbbb-0000-0000-0000-000000000002'$$,
  'Benja no puede modificar la autorización de su tutor');
select prueba.debe_fallar($$delete from autorizacion_tutor
  where persona_id = 'bbbbbbbb-0000-0000-0000-000000000002'$$,
  'Benja no puede borrar la autorización de su tutor');
insert into consentimiento (persona_id, organizacion_id, finalidad) values
  ('bbbbbbbb-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', 'compartir_ficha');
select prueba.afirmar(prueba.contar('select * from consentimiento') = 1, 'con autorización del tutor, Benja sí puede compartir');

-- =============================================================================
\echo '--- 6. Seguimiento: dato sensible, con consentimiento propio y registro de accesos'
-- =============================================================================
select set_config('request.jwt.claim.sub', 'cccccccc-0000-0000-0000-000000000003', false);
select prueba.debe_fallar($$insert into seguimiento (persona_id, organizacion_id, autor_id, tipo, contenido)
  values ('aaaaaaaa-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001',
          'cccccccc-0000-0000-0000-000000000003', 'nota', 'Nota ficticia')$$,
  'X no puede registrar seguimiento sin consentimiento de acompañamiento');

select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-0000-0000-000000000001', false);
insert into consentimiento (persona_id, organizacion_id, finalidad) values
  ('aaaaaaaa-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'acompanamiento_bienestar');

select set_config('request.jwt.claim.sub', 'cccccccc-0000-0000-0000-000000000003', false);
insert into seguimiento (persona_id, organizacion_id, autor_id, tipo, contenido) values
  ('aaaaaaaa-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001',
   'cccccccc-0000-0000-0000-000000000003', 'nota', 'Nota ficticia de acompañamiento');
select prueba.debe_fallar($$insert into seguimiento (persona_id, organizacion_id, autor_id, tipo, contenido)
  values ('aaaaaaaa-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001',
          'dddddddd-0000-0000-0000-000000000004', 'nota', 'Firma ajena')$$,
  'nadie puede registrar seguimiento firmando como otra persona');
select prueba.debe_fallar('select * from seguimiento', 'nadie lee seguimientos directamente (solo con registro de acceso)');
select prueba.afirmar(prueba.contar($$select * from ver_seguimientos('aaaaaaaa-0000-0000-0000-000000000001')$$) = 1,
  'X lee el seguimiento de Ana mediante la función con registro');

select set_config('request.jwt.claim.sub', 'dddddddd-0000-0000-0000-000000000004', false);
select prueba.debe_fallar($$select * from ver_seguimientos('aaaaaaaa-0000-0000-0000-000000000001')$$,
  'Y no puede leer el seguimiento de Ana');

select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-0000-0000-000000000001', false);
select prueba.afirmar(prueba.contar('select * from registro_acceso') = 1, 'Ana ve que X consultó su seguimiento');
select prueba.debe_fallar($$delete from registro_acceso$$, 'nadie puede borrar el registro de accesos');
select prueba.debe_fallar($$insert into registro_acceso (usuario_id, persona_id, tabla, accion)
  values ('aaaaaaaa-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'x', 'x')$$,
  'nadie puede escribir registros de acceso falsos');
reset role;

-- =============================================================================
\echo '--- 7. Integridad de los datos oficiales'
-- =============================================================================
select prueba.debe_fallar($$insert into indicador (programa_id, tipo, valor, unidad, periodo, fuente_id, url, fecha_consulta)
  values ('20000000-0000-0000-0000-000000000001', 'empleabilidad_1er_anio', null, 'porcentaje', 'titulados 2023',
          'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un indicador sin valor exige el motivo (sin dato no es cero)');
select prueba.debe_fallar($$insert into indicador (programa_id, tipo, valor, unidad, periodo, fuente_id, url, fecha_consulta)
  values ('20000000-0000-0000-0000-000000000001', 'empleabilidad_1er_anio', 140, 'porcentaje', 'titulados 2023',
          'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un porcentaje no puede pasar de 100');
insert into indicador (programa_id, tipo, valor, unidad, periodo, fuente_id, url, fecha_consulta, motivo_sin_dato)
  values ('20000000-0000-0000-0000-000000000001', 'ingreso_promedio_4to_anio', null, 'pesos', 'titulados 2021',
          'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date, 'Muestra insuficiente según la fuente');
select prueba.afirmar(prueba.contar($$select * from indicador where tipo = 'ingreso_promedio_4to_anio' and valor is null and motivo_sin_dato is not null$$) = 1,
  'un indicador sin valor y con motivo se guarda');
select prueba.debe_fallar($$insert into indicador (tipo, valor, unidad, periodo, fuente_id, url, fecha_consulta)
  values ('empleabilidad_1er_anio', 50, 'porcentaje', 'titulados 2023', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un indicador necesita exactamente un nivel');
select prueba.debe_fallar($$insert into indicador (programa_generico_id, programa_id, tipo, valor, unidad, periodo, fuente_id, url, fecha_consulta)
  values ('20500000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'empleabilidad_1er_anio', 50, 'porcentaje', 'titulados 2023', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un indicador no puede tener carrera genérica y título a la vez');

-- Nivel de cada indicador (ADR 0011): el programa completo o una sede y jornada.
insert into indicador (programa_id, variante_id, tipo, valor, unidad, periodo, fuente_id, url, fecha_consulta) values
  ('20000000-0000-0000-0000-000000000001', '21000000-0000-0000-0000-000000000001', 'arancel_anual', 3000000, 'pesos',
   'año 2026', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date),
  ('20000000-0000-0000-0000-000000000001', '21000000-0000-0000-0000-000000000002', 'arancel_anual', 2500000, 'pesos',
   'año 2026', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date);
select prueba.afirmar(prueba.contar($$select * from indicador where tipo = 'arancel_anual' and variante_id is not null$$) = 2,
  'cada jornada guarda su propio arancel en el mismo período');
select prueba.debe_fallar($$insert into indicador (programa_id, variante_id, tipo, valor, unidad, periodo, fuente_id, url, fecha_consulta)
  values ('20000000-0000-0000-0000-000000000002', '21000000-0000-0000-0000-000000000001', 'arancel_anual', 1, 'pesos',
          'año 2026', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'una cifra de una sede no puede quedar colgada de otra carrera');
select prueba.debe_fallar($$insert into indicador (programa_id, tipo, valor, unidad, periodo, fuente_id, url, fecha_consulta, motivo_sin_dato)
  values ('20000000-0000-0000-0000-000000000001', 'ingreso_promedio_4to_anio', null, 'pesos', 'titulados 2021',
          'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date, 'Duplicado')$$,
  'un indicador del programa completo no se repite en el mismo período');
select prueba.debe_fallar($$insert into programa (institucion_id, nombre, nombre_oficial, nombre_normalizado, fuente_id)
  values ('10000000-0000-0000-0000-000000000001', 'Carrera ficticia', 'Carrera ficticia', 'carrera ficticia', 'f0000000-0000-0000-0000-000000000001')$$,
  'una carrera aparece una sola vez por institución');
insert into indicador (programa_id, variante_id, tipo, valor, unidad, periodo, fuente_id, url, fecha_consulta) values
  ('20000000-0000-0000-0000-000000000001', '21000000-0000-0000-0000-000000000001', 'matricula', 120, 'estudiantes',
   'año 2026', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date);
select prueba.afirmar((select unidad = 'estudiantes' and valor = 120 from indicador where tipo = 'matricula') = true,
  'la matrícula se guarda en estudiantes, no en cupos');

-- Las nuevas tablas conservan los datos que no caben en un indicador simple.
insert into arancel_variante (variante_id, valor_pesos, unidad_original, valor_original, uf_valor, uf_fecha,
  periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000001', 4127420, 'uf', 100, 41274.20, current_date,
    'año 2026', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date);
select prueba.debe_fallar($$insert into arancel_variante (variante_id, periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000002', 'año 2026', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un arancel sin valor exige motivo');
select prueba.debe_fallar($$insert into arancel_variante (variante_id, valor_pesos, unidad_original, valor_original, periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000002', 0, 'pesos', 0, 'arancel cero', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un arancel cero se trata como dato no informado');
select prueba.debe_fallar($$insert into arancel_variante (variante_id, valor_pesos, unidad_original, valor_original, uf_fecha, periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000002', 100, 'uf', 1, current_date, 'UF sin valor', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un arancel UF exige el valor de la UF');
select prueba.debe_fallar($$insert into arancel_variante (variante_id, valor_pesos, unidad_original, valor_original, uf_valor, periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000002', 100, 'uf', 1, 41274.20, 'UF sin fecha', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un arancel UF exige la fecha de la UF');
select prueba.debe_fallar($$insert into arancel_variante (variante_id, valor_pesos, unidad_original, valor_original, uf_valor, periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000002', 100, 'pesos', 100, 41274.20, 'pesos con UF', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un arancel en pesos no lleva valor UF');

insert into tramo_ingreso_sies (programa_generico_id, tramo_publicado, desde_pesos, periodo, fuente_id, url, fecha_consulta)
  values ('20500000-0000-0000-0000-000000000001', 'Sobre $3.500.000', 3500000,
    'titulados 2018 a 2020', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date);
select prueba.afirmar((select desde_pesos = 3500000 and hasta_pesos is null from tramo_ingreso_sies) = true,
  'un tramo abierto conserva su desde y no inventa techo');
select prueba.debe_fallar($$insert into tramo_ingreso_sies (programa_generico_id, periodo, fuente_id, url, fecha_consulta)
  values ('20500000-0000-0000-0000-000000000001', 'otro período', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'un tramo sin montos exige motivo');

select prueba.debe_fallar($$insert into requisito_admision (variante_id, nem, ranking, competencia_lectora, matematica_1,
  historia_cs_sociales, ciencias, matematica_2, periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000001', 20, 15, 15, 25, 10, 10, 15,
    'Admisión 2027', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'las ponderaciones DEMRE deben sumar 100');
insert into requisito_admision (variante_id, nem, ranking, competencia_lectora, matematica_1, matematica_2,
  historia_cs_sociales, ciencias, historia_o_ciencias, puntaje_promedio_minimo, periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000001', 20, 15, 15, 25, 15, 10, 10, true, 567.5,
    'Admisión 2027', 'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date);
select prueba.afirmar((select puntaje_promedio_minimo = 567.5 from requisito_admision) = true,
  'un puntaje DEMRE decimal se guarda con ponderaciones válidas');

insert into vacante_admision (variante_id, via, cupos, periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000001', 'bea', 0, 'Admisión 2027',
    'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date);
select prueba.afirmar((select cupos = 0 from vacante_admision where via = 'bea') = true,
  'cero vacantes publicado es distinto de un dato ausente');
select prueba.debe_fallar($$insert into vacante_admision (variante_id, via, cupos, periodo, fuente_id, url, fecha_consulta)
  values ('21000000-0000-0000-0000-000000000001', 'bea', 1, 'Admisión 2027',
    'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'una vía de vacante no se repite en un proceso');

insert into acreditacion_institucion (institucion_id, estado, situacion_al, periodo, fuente_id, url, fecha_consulta)
  values ('10000000-0000-0000-0000-000000000001', 'no_acreditada', '2026-04-30', 'situación al 30 de abril de 2026',
    'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date),
  ('10000000-0000-0000-0000-000000000002', 'bajo_tutela', '2026-04-30', 'situación al 30 de abril de 2026',
    'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date);
select prueba.afirmar(prueba.contar($$select * from acreditacion_institucion where anios is null and motivo_sin_dato is null$$) = 2,
  'las instituciones no acreditadas o bajo tutela no requieren años ni motivo');
select prueba.debe_fallar($$insert into acreditacion_institucion (institucion_id, estado, situacion_al, periodo, fuente_id, url, fecha_consulta)
  values ('10000000-0000-0000-0000-000000000001', 'acreditada', '2026-05-01', 'situación al 30 de abril de 2026',
    'f0000000-0000-0000-0000-000000000001', 'https://ejemplo.cl', current_date)$$,
  'una acreditación exige años');
select prueba.debe_fallar($$update programa_variante set codigo_demre = '13073' where id = '21000000-0000-0000-0000-000000000002'$$,
  'un código DEMRE no puede repetirse entre variantes');

-- =============================================================================
\echo '--- 8. Permisos: solo los otorgados explícitamente'
-- =============================================================================
-- Segunda capa de protección, además de RLS: lo que cada rol puede hacer sobre la tabla.
select prueba.afirmar(not exists (
    select 1 from information_schema.role_table_grants
    where table_schema = 'public' and grantee = 'anon' and privilege_type <> 'SELECT'),
  'un visitante sin sesión solo puede leer: ningún otro permiso en ninguna tabla');
select prueba.afirmar((
    select array_agg(table_name::text order by table_name) from information_schema.role_table_grants
    where table_schema = 'public' and grantee = 'anon') =
  array['acreditacion_institucion', 'arancel_variante', 'beneficio', 'fuente', 'indicador', 'institucion', 'plazo',
        'programa', 'programa_generico', 'programa_variante', 'requisito_admision', 'tramo_ingreso_sies', 'vacante_admision'],
  'un visitante sin sesión lee solo las 13 tablas de datos públicos');
select prueba.afirmar(not exists (
    select 1 from information_schema.role_table_grants
    where table_schema = 'public' and grantee in ('anon', 'authenticated')
      and privilege_type in ('TRUNCATE', 'REFERENCES', 'TRIGGER')),
  'nadie desde la página puede vaciar tablas ni crear llaves o disparadores');
select prueba.afirmar(not exists (
    select 1 from information_schema.role_table_grants
    where table_schema = 'public' and grantee = 'authenticated'
      and table_name in ('seguimiento', 'registro_acceso', 'consentimiento')
      and privilege_type in ('UPDATE', 'DELETE')),
  'seguimiento, registro de accesos y consentimientos no se editan ni se borran (salvo marcar la revocación)');

-- Una tabla creada por una migración futura no da nada si no se otorga.
create table prueba_tabla_futura (id int);
select prueba.afirmar(not has_table_privilege('anon', 'public.prueba_tabla_futura', 'select')
                  and not has_table_privilege('authenticated', 'public.prueba_tabla_futura', 'select'),
  'una tabla nueva no queda abierta por defecto');
drop table prueba_tabla_futura;

-- =============================================================================
\echo '--- 9. Alertas de crisis y derivación (solo el equipo de la agencia)'
-- =============================================================================
reset role;
insert into auth.users (id, email) values
  ('eeeeeeee-0000-0000-0000-000000000005', 'equipo-agencia@ejemplo.cl'),
  ('ffffffff-0000-0000-0000-000000000006', 'lector-agencia@ejemplo.cl');
insert into organizacion (id, nombre, tipo) values
  ('30000000-0000-0000-0000-0000000000a0', 'Agencia de prueba', 'agencia');
insert into miembro (organizacion_id, usuario_id, rol) values
  ('30000000-0000-0000-0000-0000000000a0', 'eeeeeeee-0000-0000-0000-000000000005', 'acompanante'),
  ('30000000-0000-0000-0000-0000000000a0', 'ffffffff-0000-0000-0000-000000000006', 'lector');
-- El servidor registra la alerta con la clave de servicio (aquí, como administrador).
insert into alerta_crisis (id, senales, detectada_el, persona_id) values
  ('a1e70000-0000-0000-0000-000000000001', array['suicidio']::senal_crisis[], now(), 'aaaaaaaa-0000-0000-0000-000000000001');

set role anon;
select prueba.debe_fallar('select * from alerta_crisis', 'un visitante sin sesión no lee alertas');
select prueba.debe_fallar('select * from ver_alertas()', 'un visitante sin sesión no puede llamar a ver_alertas');
reset role;

set role authenticated;
select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-0000-0000-000000000001', false);
select prueba.debe_fallar('select * from alerta_crisis', 'Ana no lee la tabla de alertas directamente');
select prueba.debe_fallar('select * from ver_alertas()', 'Ana no puede ver las alertas, ni las que la mencionan');
select prueba.debe_fallar($$insert into alerta_crisis (senales, detectada_el)
  values (array['suicidio']::senal_crisis[], now())$$, 'nadie desde la página puede crear alertas');

select set_config('request.jwt.claim.sub', 'cccccccc-0000-0000-0000-000000000003', false);
select prueba.debe_fallar('select * from ver_alertas()', 'una institución cliente no ve alertas de la agencia');

select set_config('request.jwt.claim.sub', 'ffffffff-0000-0000-0000-000000000006', false);
select prueba.debe_fallar('select * from ver_alertas()', 'el lector de la agencia no ve alertas (solo administrador o acompañante)');

select set_config('request.jwt.claim.sub', 'eeeeeeee-0000-0000-0000-000000000005', false);
select prueba.afirmar(prueba.contar('select * from ver_alertas()') = 1, 'el acompañante de la agencia ve la alerta');
select prueba.afirmar(prueba.contar('select * from ver_alertas(''pendiente'')') = 1, 'se puede filtrar por estado');
select cambiar_estado_alerta('a1e70000-0000-0000-0000-000000000001', 'en_revision');
select prueba.debe_fallar($$select cambiar_estado_alerta('a1e70000-0000-0000-0000-000000000001', 'pendiente')$$,
  'no se puede volver a pendiente desde la página');
select registrar_derivacion('a1e70000-0000-0000-0000-000000000001', 'red_de_apoyo', 'Contactar a la red de apoyo de la región');
reset role;
select id as derivacion_id from derivacion limit 1 \gset
select prueba.afirmar(
  (select estado = 'derivada' from alerta_crisis where id = 'a1e70000-0000-0000-0000-000000000001'),
  'al derivar, la alerta queda como derivada');

set role authenticated;
select set_config('request.jwt.claim.sub', 'eeeeeeee-0000-0000-0000-000000000005', false);
select prueba.debe_fallar('select cerrar_derivacion(''' || :'derivacion_id' || ''', true, ''red_de_apoyo'', current_date - 1)',
  'la nota de cierre no acepta una fecha de seguimiento pasada');
select prueba.debe_fallar('select cerrar_derivacion(''' || :'derivacion_id' || ''', null, ''red_de_apoyo'', current_date + 7)',
  'la nota de cierre exige saber si la persona fue contactada');
select cerrar_derivacion(:'derivacion_id', true, 'red_de_apoyo', current_date + 7);
select prueba.debe_fallar('select cerrar_derivacion(''' || :'derivacion_id' || ''', true, ''red_de_apoyo'', current_date + 7)',
  'una derivación cerrada no se vuelve a cerrar');
reset role;

select prueba.afirmar(
  (select estado from alerta_crisis where id = 'a1e70000-0000-0000-0000-000000000001') = 'cerrada',
  'al cerrar la última derivación, la alerta queda cerrada');
select prueba.afirmar(
  (select count(*) from registro_acceso_alerta where alerta_id = 'a1e70000-0000-0000-0000-000000000001'
     and usuario_id = 'eeeeeeee-0000-0000-0000-000000000005') >= 5,
  'cada acción del equipo queda registrada (lectura, revisión, derivación, cierre)');
select prueba.afirmar(
  not exists (select 1 from information_schema.role_table_grants
              where table_schema = 'public' and table_name in ('alerta_crisis', 'derivacion', 'registro_acceso_alerta')
                and grantee in ('anon', 'authenticated')),
  'las tablas de alertas no tienen permisos directos para la página');

-- =============================================================================
\echo '--- 10. Derechos del titular'
-- =============================================================================
reset role;

set role anon;
select prueba.debe_fallar('select exportar_mis_datos()', 'un visitante sin sesión no puede exportar datos');
reset role;

set role authenticated;
select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-0000-0000-000000000001', false);
select prueba.afirmar(solicitar_derecho('portabilidad') is not null, 'Ana puede pedir la portabilidad de sus datos');
select prueba.debe_fallar('select solicitar_derecho(''portabilidad'')',
  'Ana no acumula dos solicitudes abiertas del mismo tipo');
select prueba.afirmar((exportar_mis_datos() -> 'persona' ->> 'nombre') = 'Ana Prueba',
  'la exportación de Ana incluye su registro');
select prueba.afirmar(exportar_mis_datos()::text not like '%Benja%',
  'la exportación de Ana no contiene datos de otra persona');
select prueba.afirmar(jsonb_array_length(exportar_mis_datos() -> 'consentimientos') >= 1,
  'la exportación incluye los consentimientos de Ana');
select prueba.afirmar(prueba.contar('select * from solicitud_derecho') = 1,
  'Ana ve sus propias solicitudes');

select set_config('request.jwt.claim.sub', 'bbbbbbbb-0000-0000-0000-000000000002', false);
select prueba.afirmar(prueba.contar('select * from solicitud_derecho') = 0,
  'Benja no ve la solicitud de Ana');
select prueba.debe_fallar('select * from ver_solicitudes_abiertas()', 'Benja no ve solicitudes del equipo');

select set_config('request.jwt.claim.sub', 'cccccccc-0000-0000-0000-000000000003', false);
select prueba.debe_fallar('select * from ver_solicitudes_abiertas()', 'una institución cliente no ve solicitudes de la agencia');

select set_config('request.jwt.claim.sub', 'ffffffff-0000-0000-0000-000000000006', false);
select prueba.debe_fallar('select * from ver_solicitudes_abiertas()', 'el lector de la agencia no ve solicitudes');

select set_config('request.jwt.claim.sub', 'eeeeeeee-0000-0000-0000-000000000005', false);
select prueba.afirmar(prueba.contar('select * from ver_solicitudes_abiertas()') = 1,
  'el acompañante de la agencia ve la solicitud abierta');
reset role;

select id as solicitud_id from solicitud_derecho where persona_id = 'aaaaaaaa-0000-0000-0000-000000000001' \gset
select prueba.afirmar(
  (select count(*) from registro_acceso where persona_id = 'aaaaaaaa-0000-0000-0000-000000000001'
     and tabla = 'exportacion') >= 1,
  'cada exportación queda registrada');

set role authenticated;
select set_config('request.jwt.claim.sub', 'ffffffff-0000-0000-0000-000000000006', false);
select prueba.debe_fallar($$select resolver_solicitud('00000000-0000-0000-0000-000000000000', 'resuelta', 'x')$$,
  'el lector de la agencia no resuelve solicitudes');
select set_config('request.jwt.claim.sub', 'eeeeeeee-0000-0000-0000-000000000005', false);
select resolver_solicitud(:'solicitud_id', 'resuelta', 'Se entregó el archivo con sus datos');
select prueba.debe_fallar('select resolver_solicitud(''' || :'solicitud_id' || ''', ''resuelta'', ''otra vez'')',
  'una solicitud resuelta no se vuelve a resolver');
reset role;

select prueba.afirmar(
  (select estado = 'resuelta' from solicitud_derecho where id = :'solicitud_id'),
  'la solicitud resuelta queda con su estado y su respuesta');

-- =============================================================================
\echo '--- 11. Correcciones: cierre seguro de alertas y exportación sin autor'
-- =============================================================================
reset role;
insert into alerta_crisis (id, senales, detectada_el) values
  ('a1e70000-0000-0000-0000-000000000002', array['autolesion']::senal_crisis[], now());
insert into seguimiento (persona_id, organizacion_id, autor_id, tipo, contenido) values
  ('aaaaaaaa-0000-0000-0000-000000000001', '30000000-0000-0000-0000-0000000000a0',
   'eeeeeeee-0000-0000-0000-000000000005', 'nota', 'Nota de prueba');

set role authenticated;
select set_config('request.jwt.claim.sub', 'eeeeeeee-0000-0000-0000-000000000005', false);
select registrar_derivacion('a1e70000-0000-0000-0000-000000000002', 'urgencia', 'Derivación de prueba');
select prueba.debe_fallar($$select cambiar_estado_alerta('a1e70000-0000-0000-0000-000000000002', 'cerrada')$$,
  'una alerta no se cierra con derivaciones abiertas');
select prueba.debe_fallar($$select cambiar_estado_alerta('a1e70000-0000-0000-0000-000000000001', 'en_revision')$$,
  'una alerta cerrada no se reabre');

select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-0000-0000-000000000001', false);
select prueba.afirmar(exportar_mis_datos()::text not like '%autor_id%',
  'la exportación no incluye quién escribió cada nota');
select prueba.afirmar((exportar_mis_datos() -> 'seguimientos')::text like '%Nota de prueba%',
  'la exportación sí incluye las notas sobre la persona');
reset role;

\echo '=== Todas las pruebas pasaron ==='
