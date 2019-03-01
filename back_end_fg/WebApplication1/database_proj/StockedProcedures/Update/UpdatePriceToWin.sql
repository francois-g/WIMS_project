CREATE PROCEDURE [dbo].[UpdatePriceToWin]
	@CurrentBestAuction int = null,
  @OfferEnd Datetime,
	@Active bit,
	@Id int

AS
	UPDATE PriceToWin SET CurrentBestAuction = @CurrentBestAuction, OfferEnd =  @OfferEnd, Active = @Active WHERE Id = @Id;
RETURN 0
