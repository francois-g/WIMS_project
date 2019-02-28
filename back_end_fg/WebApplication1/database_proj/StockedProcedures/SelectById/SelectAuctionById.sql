CREATE PROCEDURE [dbo].[SelectAuctionById]
	@Id int
AS
	SELECT * FROM Auction WHERE Id =  @Id;
RETURN 0
