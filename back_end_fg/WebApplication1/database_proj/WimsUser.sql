CREATE TABLE [dbo].[WimsUser]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [FirstName] NCHAR(50) NOT NULL, 
    [LastName] NCHAR(50) NOT NULL,  
    [Pseudo] NCHAR(50) NOT NULL UNIQUE, 
    [Pswd] NCHAR(50) NOT NULL, 
    [Email] NCHAR(50) NOT NULL,
    [TwitchLink] NCHAR(200),
    [PseudoTwitch] NCHAR(50),
    [Balance] INT NOT NULL DEFAULT 0,
    [ConditionAccepted] BIT NOT NULL DEFAULT 0, 
    [CurrencyId] INT NULL DEFAULT 1, 
    [Avatar] NCHAR(250) NULL, 
    [RoleId] INT NOT NULL DEFAULT 1, 
    [Active] BIT NOT NULL DEFAULT 1,
    CONSTRAINT [UK_WimsUser_Email] UNIQUE (Email), 
    CONSTRAINT [FK_WimsUser_ToTable_Currency] FOREIGN KEY ([CurrencyId]) REFERENCES [Currency]([Id]), 
    CONSTRAINT [FK_WimsUser_ToTable_Role] FOREIGN KEY ([RoleId]) REFERENCES [Role]([Id]), 
   
  
	
     
)

--GO

--CREATE TRIGGER [dbo].[Trigger_WimsUser]
--    ON [dbo].[WimsUser]
--   INSTEAD OF DELETE
--    AS
--    BEGIN
--        SET NoCount ON
--		UPDATE WimsUser SET Active = 0
--		WHERE Id in (SELECT Id
--                    FROM deleted)
--    END
