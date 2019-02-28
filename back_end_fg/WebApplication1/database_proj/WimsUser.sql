CREATE TABLE [dbo].[WimsUser]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [Name] NCHAR(50) NOT NULL, 
    [LastName] NCHAR(50) NOT NULL, 
    [NickName] NCHAR(50) NOT NULL, 
    [Email] NCHAR(50) NOT NULL, 
    [IsTwitcher] BIT NOT NULL DEFAULT 0, 
    [ConditionAccepted] BIT NOT NULL DEFAULT 0, 
    [CurrencyId] INT NULL DEFAULT 1, 
    [Avatar] IMAGE NULL, 
    [Active] BIT NOT NULL DEFAULT 1, 
    [Pswd] NCHAR(50) NOT NULL, 
    [RoleId] INT NOT NULL DEFAULT 1, 
    CONSTRAINT [UK_WimsUser_Email] UNIQUE (Email), 
    CONSTRAINT [FK_WimsUser_ToTable_Currency] FOREIGN KEY ([CurrencyId]) REFERENCES [Currency]([Id]), 
    CONSTRAINT [FK_WimsUser_ToTable_Role] FOREIGN KEY ([RoleId]) REFERENCES [Role]([Id]), 
   
  
	
     
)

GO

CREATE TRIGGER [dbo].[Trigger_WimsUser]
    ON [dbo].[WimsUser]
   INSTEAD OF DELETE
    AS
    BEGIN
        SET NoCount ON
		UPDATE WimsUser SET Active = 0
		WHERE Id in (SELECT Id
                    FROM deleted)
    END