CREATE PROCEDURE [dbo].[UpdatePriceToWin]
	@OfferEnd Datetime,
  @Description varchar(MAX) = null,
	@Active bit,
	@Id int

AS
	UPDATE PriceToWin SET OfferEnd = @OfferEnd, Description = @Description, Active = @Active WHERE Id = @Id;
RETURN 0
