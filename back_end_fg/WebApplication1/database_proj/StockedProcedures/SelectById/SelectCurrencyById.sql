CREATE PROCEDURE [dbo].[SelectCurrencyById]
	@Id int
AS
	SELECT * FROM Currency WHERE Id = @Id;
RETURN 0
