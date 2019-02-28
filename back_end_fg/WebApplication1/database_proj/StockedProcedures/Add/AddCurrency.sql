CREATE PROCEDURE [dbo].[AddCurrency]
	@CurrencyName varchar(50),
	@ConversionRate decimal(18, 4),
	@CurrencyShortCut varchar(10)
AS
	INSERT INTO Currency(CurrencyName, ConversionRate, CurrencyShortCut) VALUES (@CurrencyName, @ConversionRate, @CurrencyShortCut);
RETURN 0
