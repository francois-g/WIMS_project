CREATE PROCEDURE [dbo].[SelectPriceToWinById]
	@Id int
AS
	SELECT * FROM PriceToWin WHERE Id = @Id;
RETURN 0
