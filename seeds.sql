
create function public.handle_new_user () returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url, email, username)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.email,
    new.raw_user_meta_data->>'username'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users 
for each row execute procedure public.handle_new_user ();


create table public.agencies (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name text not null default ''::text,
  email text not null default ''::text,
  logo_url text not null default ''::text,
  address jsonb null,
  website_url text not null default ''::text,
  status text not null default ''::text,
  subdomain text not null default ''::text,
  constraint agencies_pkey primary key (id)
);

create table public.users (
  id uuid not null,
  updated_at timestamp with time zone not null default now(),
  username text null default ''::text,
  full_name text null default ''::text,
  avatar_url text null default ''::text,
  email text null default ''::text,
  status text null default ''::text,
  agency_id uuid null,
  constraint users_pkey primary key (id),
  constraint users_agency_id_fkey foreign key (agency_id) references public.agencies (id) on update cascade on delete cascade,
  constraint users_id_fkey foreign key (id) references auth.users (id) on update cascade
);

create table public.role_permissions (
  role public.app_role not null,
  permission public.app_permission not null,
  id uuid not null default gen_random_uuid (),
  constraint role_permissions_pkey primary key (id),
  constraint role_permissions_role_permission_key unique (role, permission)
);

create table public.user_roles (
  user_id uuid not null,
  role public.app_role not null,
  id uuid not null default gen_random_uuid (),
  constraint user_roles_pkey primary key (id),
  constraint user_roles_user_id_role_key unique (user_id, role),
  constraint user_roles_user_id_fkey foreign key (user_id) references public.users (id) on delete cascade
);

-- Custom types
create type public.app_permission as enum('agencies.delete', 'agencies.update', 'agencies.read', 'agencies.create', 'users.delete', 'users.update', 'users.read', 'users.create');

create type public.app_role as enum('admin', 'agency_owner', 'agency_user');

alter table public.user_roles
add constraint user_roles_user_id_fkey foreign key (user_id) references public.users (id) on delete cascade;

alter table public.role_permissions
add constraint role_permissions_role_fkey foreign key (role) references public.app_role (role);

alter table public.role_permissions
add constraint role_permissions_permission_fkey foreign key (permission) references public.app_permission (permission);

alter table public.user_roles
add constraint user_roles_role_fkey foreign key (role) references public.app_role (role);

alter table public.user_roles
add constraint user_roles_permission_fkey foreign key (permission) references public.app_permission (permission);

alter table public.agencies
add constraint agencies_role_fkey foreign key (role) references public.app_role (role);

alter table public.agencies
add constraint agencies_permission_fkey foreign key (permission) references public.app_permission (permission);

alter table public.agencies
add constraint agencies_user_id_fkey foreign key (user_id) references public.users (id);

alter table public.agencies
add constraint agencies_role_permission_key unique (role, permission);

alter table public.user_roles
add constraint user_roles_user_id_role_key unique (user_id, role);

alter table public.role_permissions
add constraint role_permissions_role_permission_key unique (role, permission);

alter table public.agencies
add constraint agencies_pkey primary key (id);

alter table public.users
add constraint users_pkey primary key (id);

alter table public.role_permissions
add constraint role_permissions_pkey primary key (id);

alter table public.user_roles
add constraint user_roles_pkey primary key (id);

alter table public.agencies
alter column id set default gen_random_uuid ();

alter table public.users
alter column id set default gen_random_uuid ();

alter table public.role_permissions
alter column id set default gen_random_uuid ();

alter table public.user_roles
alter column id set default gen_random_uuid ();

alter table public.agencies
alter column created_at set default now ();

alter table public.users
alter column updated_at set default now ();