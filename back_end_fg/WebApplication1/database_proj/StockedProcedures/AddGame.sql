CREATE PROCEDURE [dbo].[AddGame]
	@GameName varchar(50),
	@GameImg image
AS
	INSERT INTO Game(GameName, GameImg) VALUES (@GameName, @GameImg);

RETURN 0
