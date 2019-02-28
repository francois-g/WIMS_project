CREATE PROCEDURE [dbo].[UpdateGame]
	@GameId int,
	@GameName varchar(50),
	@GameImg varchar(MAX)
AS
	UPDATE Game SET GameName = @GameName, GameImg = @GameImg WHERE Id = @GameId;
RETURN 0
