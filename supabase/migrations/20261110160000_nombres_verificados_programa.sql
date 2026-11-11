-- Conserva el texto publicado por Mineduc y separa el nombre que verá la persona.
-- Una corrección solo se marca verificada cuando otra fuente oficial respalda su
-- ortografía; los programas pendientes mantienen el texto original.

alter table programa
  add column nombre_oficial text,
  add column nombre_verificado boolean not null default false,
  add column nombre_fuente_id uuid references fuente (id),
  add column nombre_verificado_el date;

update programa set nombre_oficial = nombre;

alter table programa
  alter column nombre_oficial set not null,
  add constraint programa_nombre_verificacion_completa check (
    (nombre_verificado and nombre_fuente_id is not null and nombre_verificado_el is not null)
    or
    (not nombre_verificado and nombre_fuente_id is null and nombre_verificado_el is null)
  );
