create database inazuma;

use inazuma;

create table usuario(tsurugi
idUsuario int primary key auto_increment,
nome varchar(45),
sobrenome varchar(45),
email varchar(60),
dtNasc date,
senha varchar(45),
confirmeSenha varchar(45),
nome_usuario varchar(80),
fkPersonagem int,
constraint fkPersonagemUSuario foreign key (fkPersonagem) references personagem (idPersonagem)
) auto_increment = 11;

create table personagem (
idPersonagem int primary key auto_increment,
nome varchar(60),
times varchar(90));


create table hissatsu (
idHissatsu int primary key auto_increment,
nome varchar(60),
tipo varchar(45),
fkPersonagem int,
constraint fkPersonagemHissatsu foreign key (fkPersonagem) references personagem (idPersonagem), 
constraint chkTipoHissatsu check (tipo in ('defesa', 'chute', 'drible', 'bloqueio'))); 


insert into personagem values
(default, 'Mamoru Endo', 'Raimon'),
(default, 'Shuji Goenji', 'Raimon'),
(default, 'Matsukaze Tenma', 'Raimon'),
(default, 'Kyosuke Tsurugi', 'Raimon'),
(default, 'Inamori Asuto', 'Raimon'),
(default, 'Goujin Tetsunosuki', 'Raimon');

select * from personagem;

insert into hissatsu values
(default, 'Mão Fantasma','defesa', 1),
(default, 'Fire Tornado', 'chute', 2),
(default, 'Majin Hand', 'defesa', 1);

select * from hissatsu;

insert into usuario values
(default, 'Cauê', 'Oliveira', 'cauemoms@gmail.com', '2005-12-16', 'caue', 'caue', 'shalooom', 1);

select * from usuario join personagem as p on fkPersonagem = p.idPersonagem left join hissatsu as h on h.fkPersonagem = idPersonagem;