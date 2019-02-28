CREATE PROCEDURE [dbo].[DeleteCurrency]
	@Id int
AS
	DELETE FROM Currency WHERE Id = @Id;
RETURN 0
