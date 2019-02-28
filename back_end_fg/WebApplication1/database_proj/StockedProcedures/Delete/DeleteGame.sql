CREATE PROCEDURE [dbo].[DeleteGame]
	@Id int
	
AS
	DELETE FROM Game WHERE Id = @Id;
RETURN 0
