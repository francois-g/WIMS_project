CREATE TABLE [dbo].[Game] (
    [Id]       INT           IDENTITY (1, 1) NOT NULL,
    [GameName] NCHAR (50)    NOT NULL,
    [GameImg]  VARCHAR (MAX) NULL,
    [Active]   BIT           DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);



GO

CREATE TRIGGER [dbo].[Trigger_Game]
    ON [dbo].[Game]
    INSTEAD OF DELETE
    AS
    BEGIN
        SET NoCount ON
		UPDATE Game set Active = 0 
		WHERE Id in (SELECT Id
                    FROM deleted)
    END