CREATE PROCEDURE [dbo].[DeleteAuction]
	@Id int
AS
	DELETE FROM Auction WHERE Id = @Id;
RETURN 0
