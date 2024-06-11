create database inazuma;

use inazuma;

create table personagem (
idPersonagem int primary key auto_increment,
nome varchar(50),
times varchar(50));

insert into personagem values 
(default, 'Mamoru Endo', 'Raimon'),
(default, 'Shuji Goenji', 'Raimon'),
(default, 'Matsukaze Tenma', 'Raimon'),
(default, 'Kyosuke Tsurugi', 'Raimon'),
(default, 'Inamori Asuto', 'Raimon'),
(default, 'Goujin Tetsunosuki', 'Raimon'),
(8, 'Jousuke Tsunami', 'Raimon');

select * from personagem;

create table imagens (
idImagens int primary key auto_increment,
imagem varchar(100),
fkPersonagem int,
constraint foreign key (fkPersonagem) references personagem(idPersonagem));

insert into imagens value 
(default, 'assets/imagens/endou perfil.png', 1),
(default, 'assets/imagens/Matsukaze perfil.png', 3),
(default, 'assets/imagens/Tsurugi perfil.png', 4),
(default, 'assets/imagens/GOenji perfil.png', 2),
(default, 'assets/imagens/Asuto perfil.png', 5),
(default, 'assets/imagens/Goujin perfil.png', 6),
(default, 'assets/imagens/Tsunami perfil.png', 8);

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(100),
usuario varchar (45),
email varchar(100),
senha varchar(70),
fkPersonagem int,
constraint foreign key (fkPersonagem) references personagem (idPersonagem));

select * from usuario;

create table quiz (
idQuiz int primary key auto_increment,
qtPontos int,
tempo time(3),
tipoQuiz varchar(45),
fkUsuario int,
constraint foreign key (fkUsuario) references usuario (idUsuario));

