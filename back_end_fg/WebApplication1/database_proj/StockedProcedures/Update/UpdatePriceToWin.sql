CREATE PROCEDURE [dbo].[UpdatePriceToWin]
	@CurrentBestAuction int = null,
	@Active bit,
	@Id int

AS
	UPDATE PriceToWin SET CurrentBestAuction = @CurrentBestAuction, Active = @Active WHERE Id = @Id;
RETURN 0
