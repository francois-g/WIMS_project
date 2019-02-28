CREATE TABLE [dbo].[PriceToWin] (
    [Id]                 INT      IDENTITY (1, 1) NOT NULL,
    [TwitcherId]         INT      NOT NULL,
    [CurrentBestAuction] INT      NULL,
    [OfferEnd]           DATETIME NOT NULL,
    [GameId]             INT      NOT NULL,
    [AuctionStartValue]  INT      NOT NULL,
    [Active]             BIT      DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_BestAuction_ToTableAuction] FOREIGN KEY ([CurrentBestAuction]) REFERENCES [dbo].[Auction] ([Id]),
    CONSTRAINT [FK_GameId_ToTableGame] FOREIGN KEY ([GameId]) REFERENCES [dbo].[Game] ([Id])
);



GO

CREATE TRIGGER [dbo].[Trigger_PriceToWin]
    ON [dbo].[PriceToWin]
    INSTEAD OF DELETE
    AS
    BEGIN
        SET NoCount ON
		UPDATE PriceToWin SET Active = 0
		WHERE Id in (SELECT Id
                    FROM deleted)
    END
