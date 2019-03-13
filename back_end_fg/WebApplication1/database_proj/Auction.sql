CREATE TABLE [dbo].[Auction]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [UserId] INT NOT NULL, 
    [MinAuction] INT NULL, 
    [MaxAuction] INT NULL, 
    [CurrentAuction] INT NOT NULL, 
    [AuctionDate] DATETIME NULL, 
    [AuctionValidation] BIT NOT NULL DEFAULT 0, 
    [OfferId] INT NULL, 
    CONSTRAINT [FK_Auction_ToTable_PriceToWin] FOREIGN KEY ([OfferId]) REFERENCES [PriceToWin]([Id]),
)

--GO

--CREATE TRIGGER [dbo].[Trigger_Auction]
--    ON [dbo].[Auction]
--    INSTEAD OF DELETE
--    AS
--    BEGIN
--        SET NoCount ON
--		UPDATE Auction SET Active = 0 WHERE Id IN (SELECT Id FROM Deleted)
--    END
