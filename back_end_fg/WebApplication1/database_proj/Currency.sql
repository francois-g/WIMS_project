CREATE TABLE [dbo].[Currency]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [CurrencyName] NCHAR(50) NOT NULL, 
    [ConversionRate] DECIMAL(18, 4) NOT NULL, 
    [CurrencyShortCut] NCHAR(10) NOT NULL
)
