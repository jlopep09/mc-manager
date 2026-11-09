create table `mc-manager-db`.role
(
    id   int auto_increment
        primary key,
    name varchar(50) not null,
    constraint name
        unique (name)
);

create table `mc-manager-db`.users
(
    id          int auto_increment
        primary key,
    email       varchar(300)                         not null,
    external_id varchar(300)                         null,
    username    varchar(300)                         not null,
    created_at  datetime default current_timestamp() null,
    updated_at  datetime default current_timestamp() null,
    last_login  datetime                             null on update current_timestamp(),
    constraint uk_user_email
        unique (email),
    constraint uk_user_external_id
        unique (external_id)
);

create table `mc-manager-db`.user_role
(
    id      int auto_increment
        primary key,
    user_id int not null,
    role_id int not null,
    constraint uk_user_role
        unique (user_id, role_id),
    constraint fk_user_role_rol
        foreign key (role_id) references `mc-manager-db`.role (id)
            on delete cascade,
    constraint fk_user_role_user
        foreign key (user_id) references `mc-manager-db`.users (id)
            on delete cascade
);

create index idx_user_role_rol_id
    on `mc-manager-db`.user_role (role_id);

