CREATE PROCEDURE [dbo].[DeletePriceToWin]
	@Id int
AS
	DELETE FROM PriceToWin WHERE Id = @Id;
RETURN 0
