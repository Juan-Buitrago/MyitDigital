CREATE TABLE users
(
    id          int(6) unsigned auto_increment primary key,
    name        varchar(50) null,
    lastname    varchar(50) null,
    dni         varchar(50) null,
    networkuser varchar(50) null,
    email       varchar(50) null,
    birthdate   date        null,
    lowdate     date        null,
    state       int(1)      null,
    constraint users_pk
    unique (dni)
);
