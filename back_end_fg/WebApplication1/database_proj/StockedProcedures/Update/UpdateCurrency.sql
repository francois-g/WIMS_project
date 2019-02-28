CREATE PROCEDURE [dbo].[UpdateCurrency]
	@Id int,
	@CurrencyName varchar(50),
	@ConversionRate decimal(18, 4),
	@CurrencyShortcut varchar(10)
AS
	UPDATE Currency SET CurrencyName = @CurrencyName, ConversionRate = @ConversionRate, CurrencyShortCut = @CurrencyShortcut WHERE Id = @Id;
RETURN 0
