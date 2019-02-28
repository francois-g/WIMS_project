CREATE PROCEDURE [dbo].[SelectGameById]
	@GameId int
AS
	SELECT Game.Id, Game.GameName, Game.GameImg from Game Where Game.Id = @GameId;
RETURN 0
