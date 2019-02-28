/*
Script de déploiement pour WIMS_Database

Ce code a été généré par un outil.
La modification de ce fichier peut provoquer un comportement incorrect et sera perdue si
le code est régénéré.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "WIMS_Database"
:setvar DefaultFilePrefix "WIMS_Database"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\"

GO
:on error exit
GO
/*
Détectez le mode SQLCMD et désactivez l'exécution du script si le mode SQLCMD n'est pas pris en charge.
Pour réactiver le script une fois le mode SQLCMD activé, exécutez ce qui suit :
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'Le mode SQLCMD doit être activé de manière à pouvoir exécuter ce script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET ANSI_NULLS ON,
                ANSI_PADDING ON,
                ANSI_WARNINGS ON,
                ARITHABORT ON,
                CONCAT_NULL_YIELDS_NULL ON,
                QUOTED_IDENTIFIER ON,
                ANSI_NULL_DEFAULT ON,
                CURSOR_DEFAULT LOCAL,
                RECOVERY FULL 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET PAGE_VERIFY NONE 
            WITH ROLLBACK IMMEDIATE;
    END


GO
ALTER DATABASE [$(DatabaseName)]
    SET TARGET_RECOVERY_TIME = 0 SECONDS 
    WITH ROLLBACK IMMEDIATE;


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET QUERY_STORE (CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 367)) 
            WITH ROLLBACK IMMEDIATE;
    END


GO
PRINT N'L''opération de refactorisation de changement de nom avec la clé ee267ec1-a6bc-4b04-bb59-bcdc6aca5145 est ignorée, l''élément [dbo].[User].[Pseudo] (SqlSimpleColumn) ne sera pas renommé en NickName';


GO
PRINT N'L''opération de refactorisation de changement de nom avec la clé bfcacc27-7964-4625-8c89-4329bb778bd8 est ignorée, l''élément [dbo].[User].[N] (SqlSimpleColumn) ne sera pas renommé en FirstName';


GO
PRINT N'L''opération de refactorisation de changement de nom avec la clé 5125eb0d-f334-45fe-bcce-123719878f12 est ignorée, l''élément [dbo].[PriceToWin].[UserId] (SqlSimpleColumn) ne sera pas renommé en CurrentWinner';


GO
PRINT N'L''opération de refactorisation de changement de nom avec la clé 26f83778-c86e-47c4-acc3-882bb06ab593 est ignorée, l''élément [dbo].[WimsUser].[Currency] (SqlSimpleColumn) ne sera pas renommé en CurrencyId';


GO
PRINT N'L''opération de refactorisation de changement de nom avec la clé c73d8f48-5ad8-47eb-ae9c-f436453bd5bd est ignorée, l''élément [dbo].[WimsUser].[Password] (SqlSimpleColumn) ne sera pas renommé en Pswd';


GO
PRINT N'L''opération de refactorisation de changement de nom avec la clé a5299c9e-14f5-4a0b-9903-04bfc40f5e75 est ignorée, l''élément [dbo].[PriceToWin].[AuctionStart] (SqlSimpleColumn) ne sera pas renommé en AuctionStartValue';


GO
PRINT N'L''opération de refactorisation de changement de nom avec la clé ed1d8819-a77f-4dcc-aac0-d46df46fd436 est ignorée, l''élément [dbo].[Auction].[AuctionPrice] (SqlSimpleColumn) ne sera pas renommé en AuctionPriceId';


GO
PRINT N'L''opération de refactorisation de changement de nom avec la clé 6a2e2538-134b-4cb7-b951-0272ccabcd24 est ignorée, l''élément [dbo].[FK_Auction_ToTable] (SqlForeignKeyConstraint) ne sera pas renommé en [FK_Auction_ToTable_PriceToWin]';


GO
PRINT N'L''opération de refactorisation de changement de nom avec la clé ef2d0a8a-8959-4dd3-acf2-eaca82560c32 est ignorée, l''élément [dbo].[WimsUser].[Role] (SqlSimpleColumn) ne sera pas renommé en RoleId';


GO
PRINT N'Création de [dbo].[Auction]...';


GO
CREATE TABLE [dbo].[Auction] (
    [Id]                INT  IDENTITY (1, 1) NOT NULL,
    [TwitcherId]        INT  NOT NULL,
    [UserId]            INT  NOT NULL,
    [MinAuction]        INT  NULL,
    [MaxAuction]        INT  NULL,
    [CurrentAuction]    INT  NULL,
    [AuctionDate]       DATE NULL,
    [AuctionValidation] BIT  NULL,
    [AuctionPriceId]    INT  NULL,
    [Active]            BIT  NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Création de [dbo].[Currency]...';


GO
CREATE TABLE [dbo].[Currency] (
    [Id]               INT             IDENTITY (1, 1) NOT NULL,
    [CurrencyName]     NCHAR (50)      NOT NULL,
    [ConversionRate]   DECIMAL (18, 4) NOT NULL,
    [CurrencyShortCut] NCHAR (10)      NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Création de [dbo].[Game]...';


GO
CREATE TABLE [dbo].[Game] (
    [Id]       INT        IDENTITY (1, 1) NOT NULL,
    [GameName] NCHAR (50) NOT NULL,
    [GameImg]  IMAGE      NOT NULL,
    [Active]   BIT        NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Création de [dbo].[PriceToWin]...';


GO
CREATE TABLE [dbo].[PriceToWin] (
    [Id]                INT      IDENTITY (1, 1) NOT NULL,
    [TwitcherId]        INT      NOT NULL,
    [CurrentWinner]     INT      NULL,
    [AuctionEnd]        DATETIME NOT NULL,
    [GameId]            INT      NOT NULL,
    [AuctionStartValue] INT      NOT NULL,
    [Active]            BIT      NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Création de [dbo].[Role]...';


GO
CREATE TABLE [dbo].[Role] (
    [Id]       INT        IDENTITY (1, 1) NOT NULL,
    [RoleName] NCHAR (50) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Création de [dbo].[WimsUser]...';


GO
CREATE TABLE [dbo].[WimsUser] (
    [Id]                INT        IDENTITY (1, 1) NOT NULL,
    [Name]              NCHAR (50) NOT NULL,
    [LastName]          NCHAR (50) NOT NULL,
    [NickName]          NCHAR (50) NOT NULL,
    [Email]             NCHAR (50) NOT NULL,
    [IsTwitcher]        BIT        NOT NULL,
    [ConditionAccepted] BIT        NOT NULL,
    [CurrencyId]        INT        NULL,
    [Avatar]            IMAGE      NULL,
    [Active]            BIT        NOT NULL,
    [Pswd]              NCHAR (50) NOT NULL,
    [RoleId]            INT        NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [UK_WimsUser_Email] UNIQUE NONCLUSTERED ([Email] ASC)
);


GO
PRINT N'Création de contrainte sans nom sur [dbo].[Auction]...';


GO
ALTER TABLE [dbo].[Auction]
    ADD DEFAULT 1 FOR [Active];


GO
PRINT N'Création de contrainte sans nom sur [dbo].[Game]...';


GO
ALTER TABLE [dbo].[Game]
    ADD DEFAULT 1 FOR [Active];


GO
PRINT N'Création de contrainte sans nom sur [dbo].[PriceToWin]...';


GO
ALTER TABLE [dbo].[PriceToWin]
    ADD DEFAULT 1 FOR [Active];


GO
PRINT N'Création de contrainte sans nom sur [dbo].[WimsUser]...';


GO
ALTER TABLE [dbo].[WimsUser]
    ADD DEFAULT 0 FOR [IsTwitcher];


GO
PRINT N'Création de contrainte sans nom sur [dbo].[WimsUser]...';


GO
ALTER TABLE [dbo].[WimsUser]
    ADD DEFAULT 0 FOR [ConditionAccepted];


GO
PRINT N'Création de contrainte sans nom sur [dbo].[WimsUser]...';


GO
ALTER TABLE [dbo].[WimsUser]
    ADD DEFAULT 1 FOR [CurrencyId];


GO
PRINT N'Création de contrainte sans nom sur [dbo].[WimsUser]...';


GO
ALTER TABLE [dbo].[WimsUser]
    ADD DEFAULT 1 FOR [Active];


GO
PRINT N'Création de contrainte sans nom sur [dbo].[WimsUser]...';


GO
ALTER TABLE [dbo].[WimsUser]
    ADD DEFAULT 1 FOR [RoleId];


GO
PRINT N'Création de [dbo].[FK_Auction_ToTable_PriceToWin]...';


GO
ALTER TABLE [dbo].[Auction] WITH NOCHECK
    ADD CONSTRAINT [FK_Auction_ToTable_PriceToWin] FOREIGN KEY ([AuctionPriceId]) REFERENCES [dbo].[PriceToWin] ([Id]);


GO
PRINT N'Création de [dbo].[FK_PriceToWin_ToTable]...';


GO
ALTER TABLE [dbo].[PriceToWin] WITH NOCHECK
    ADD CONSTRAINT [FK_PriceToWin_ToTable] FOREIGN KEY ([CurrentWinner]) REFERENCES [dbo].[Auction] ([Id]);


GO
PRINT N'Création de [dbo].[FK_PriceToWin_ToTable_1]...';


GO
ALTER TABLE [dbo].[PriceToWin] WITH NOCHECK
    ADD CONSTRAINT [FK_PriceToWin_ToTable_1] FOREIGN KEY ([GameId]) REFERENCES [dbo].[Game] ([Id]);


GO
PRINT N'Création de [dbo].[FK_WimsUser_ToTable_Currency]...';


GO
ALTER TABLE [dbo].[WimsUser] WITH NOCHECK
    ADD CONSTRAINT [FK_WimsUser_ToTable_Currency] FOREIGN KEY ([CurrencyId]) REFERENCES [dbo].[Currency] ([Id]);


GO
PRINT N'Création de [dbo].[FK_WimsUser_ToTable_Role]...';


GO
ALTER TABLE [dbo].[WimsUser] WITH NOCHECK
    ADD CONSTRAINT [FK_WimsUser_ToTable_Role] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Role] ([Id]);


GO
PRINT N'Création de [dbo].[Trigger_Auction]...';


GO

CREATE TRIGGER [dbo].[Trigger_Auction]
    ON [dbo].[Auction]
    INSTEAD OF DELETE
    AS
    BEGIN
        SET NoCount ON
		UPDATE Auction SET Active = 0 WHERE Id IN (SELECT Id FROM Deleted)
    END
GO
PRINT N'Création de [dbo].[Trigger_Game]...';


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
GO
PRINT N'Création de [dbo].[Trigger_PriceToWin]...';


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
GO
PRINT N'Création de [dbo].[Trigger_WimsUser]...';


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
GO
PRINT N'Création de [dbo].[AddAuction]...';


GO
CREATE PROCEDURE [dbo].[AddAuction]
	@TwitcherId int,
	@UserId int,
	@MinAuction int,
	@MaxAuction int,
	@CurrentAuction int,
	@AuctionDate datetime,
	@AuctionValidation bit,
	@AuctionPriceId int,
	@Active bit
AS
	INSERT INTO Auction(TwitcherId, UserId, MinAuction, MaxAuction, CurrentAuction, AuctionDate, AuctionValidation, AuctionPriceId, Active)
	VALUES (@TwitcherId, @UserId, @MinAuction, @MaxAuction, @CurrentAuction, @AuctionDate, @AuctionValidation, @AuctionPriceId, @Active);
RETURN 0
GO
PRINT N'Création de [dbo].[AddCurrency]...';


GO
CREATE PROCEDURE [dbo].[AddCurrency]
	@CurrencyName varchar(50),
	@ConversionRate decimal(18, 4),
	@CurrencyShortCut varchar(10)
AS
	INSERT INTO Currency(CurrencyName, ConversionRate, CurrencyShortCut) VALUES (@CurrencyName, @ConversionRate, @CurrencyShortCut);
RETURN 0
GO
PRINT N'Création de [dbo].[AddGame]...';


GO
CREATE PROCEDURE [dbo].[AddGame]
	@GameName varchar(50),
	@GameImg image
AS
	INSERT INTO Game(GameName, GameImg) VALUES (@GameName, @GameImg);

RETURN 0
GO
PRINT N'Création de [dbo].[AddPriceToWin]...';


GO
CREATE PROCEDURE [dbo].[AddPriceToWin]
	@TwitcherId int,
	@CurrentWinner int,
	@AuctionEnd datetime,
	@GameId int,
	@AuctionStartValue int,
	@Active bit
AS
	INSERT INTO PriceToWin(TwitcherId, CurrentWinner, AuctionEnd, GameId, AuctionStartValue, Active) 
	VALUES (@TwitcherId, @CurrentWinner, @AuctionEnd, @GameId, @AuctionStartValue, @Active);
RETURN 0
GO
PRINT N'Création de [dbo].[AddWimsUser]...';


GO
CREATE PROCEDURE [dbo].[AddWimsUser]
	@Name varchar(50),
	@LastName varchar(50),
	@NickName varchar(50),
	@Email varchar(50),
	@IsTwitcher bit,
	@ConditionAccepted bit,
	@CurrencyId int,
	@Avatar image,
	@Pswd varchar(50),
	@Role int





AS
	INSERT INTO WimsUser ( Name, LastName, NickName, Email, IsTwitcher, ConditionAccepted, CurrencyId, Avatar, Pswd, RoleId) 
	VALUES (@Name, @LastName, @NickName, @Email, @IsTwitcher, @ConditionAccepted, @CurrencyId, @Avatar, @Pswd, @Role);
RETURN 0
GO
PRINT N'Création de [dbo].[DeleteAuction]...';


GO
CREATE PROCEDURE [dbo].[DeleteAuction]
	@Id int
AS
	DELETE FROM Auction WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[DeleteCurrency]...';


GO
CREATE PROCEDURE [dbo].[DeleteCurrency]
	@Id int
AS
	DELETE FROM Currency WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[DeleteGame]...';


GO
CREATE PROCEDURE [dbo].[DeleteGame]
	@Id int
	
AS
	DELETE FROM Game WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[DeletePriceToWin]...';


GO
CREATE PROCEDURE [dbo].[DeletePriceToWin]
	@Id int
AS
	DELETE FROM PriceToWin WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[DeleteWimsUser]...';


GO
CREATE PROCEDURE [dbo].[DeleteWimsUser]
	@Id int
AS
	DELETE FROM WimsUser WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[SelectAuction]...';


GO
CREATE PROCEDURE [dbo].[SelectAuction]
	
AS
	SELECT * FROM Auction;
RETURN 0
GO
PRINT N'Création de [dbo].[SelectAuctionById]...';


GO
CREATE PROCEDURE [dbo].[SelectAuctionById]
	@Id int
AS
	SELECT * FROM Auction WHERE Id =  @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[SelectCurrency]...';


GO
CREATE PROCEDURE [dbo].[SelectCurrency]
	
AS
	SELECT * FROM Currency;
GO
PRINT N'Création de [dbo].[SelectCurrencyById]...';


GO
CREATE PROCEDURE [dbo].[SelectCurrencyById]
	@Id int
AS
	SELECT * FROM Currency WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[SelectGame]...';


GO
CREATE PROCEDURE [dbo].[SelectGame]
	
	
AS
	SELECT * FROM Game
RETURN 0
GO
PRINT N'Création de [dbo].[SelectGameById]...';


GO
CREATE PROCEDURE [dbo].[SelectGameById]
	@GameId int
AS
	SELECT Game.Id, Game.GameName, Game.GameImg from Game Where Game.Id = @GameId;
RETURN 0
GO
PRINT N'Création de [dbo].[SelectPriceToWin]...';


GO
CREATE PROCEDURE [dbo].[SelectPriceToWin]
	
AS
	SELECT * FROM PriceToWin;
RETURN 0
GO
PRINT N'Création de [dbo].[SelectPriceToWinById]...';


GO
CREATE PROCEDURE [dbo].[SelectPriceToWinById]
	@Id int
AS
	SELECT * FROM PriceToWin WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[SelectWimsUerById]...';


GO
CREATE PROCEDURE [dbo].[SelectWimsUerById]
	@Id int
AS
	SELECT * FROM WimsUser WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[SelectWimsUser]...';


GO
CREATE PROCEDURE [dbo].[SelectWimsUser]
	
AS
	SELECT * From WimsUser;
RETURN 0
GO
PRINT N'Création de [dbo].[UpdateAuction]...';


GO
CREATE PROCEDURE [dbo].[UpdateAuction]
	@TwitcherId int,
	@UserId int,
	@MinAuction int,
	@MaxAuction int,
	@CurrentAuction int,
	@AuctionDate datetime,
	@AuctionValidation bit,
	@AuctionPriceId int,
	@Active bit,
	@Id int
AS
	UPDATE Auction SET TwitcherId = @TwitcherId, UserId = @UserId, MinAuction = @MinAuction, MaxAuction = @MaxAuction, CurrentAuction = @CurrentAuction,
	AuctionDate = @AuctionDate, AuctionPriceId = @AuctionPriceId, Active = @Active WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[UpdateCurrency]...';


GO
CREATE PROCEDURE [dbo].[UpdateCurrency]
	@Id int,
	@CurrencyName varchar(50),
	@ConversionRate decimal(18, 4),
	@CurrencyShortcut varchar(10)
AS
	UPDATE Currency SET CurrencyName = @CurrencyName, ConversionRate = @ConversionRate, CurrencyShortCut = @CurrencyShortcut WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[UpdateGame]...';


GO
CREATE PROCEDURE [dbo].[UpdateGame]
	@GameId int,
	@GameName varchar(50),
	@GameImg image
AS
	UPDATE Game SET GameName = @GameName, GameImg = @GameImg WHERE Id = @GameId;
RETURN 0
GO
PRINT N'Création de [dbo].[UpdatePriceToWin]...';


GO
CREATE PROCEDURE [dbo].[UpdatePriceToWin]
	@TwitcherId int,
	@CurrentWinner int,
	@AuctionEnd datetime,
	@GameId int,
	@AuctionStartValue int,
	@Active bit,
	@Id int

AS
	UPDATE PriceToWin SET TwitcherId = @TwitcherId, CurrentWinner = @CurrentWinner, AuctionEnd = @AuctionEnd, GameId = @GameId,
	AuctionStartValue = @AuctionStartValue, Active = @Active WHERE Id = @Id;
RETURN 0
GO
PRINT N'Création de [dbo].[UpdateWimsUser]...';


GO
CREATE PROCEDURE [dbo].[UpdateWimsUser]
	@Id int,
	@Name varchar(50),
	@LastName varchar(50),
	@NickName varchar(50),
	@Email varchar(50),
	@IsTwitcher bit,
	@ConditionAccepted bit,
	@CurrencyId int,
	@Avatar image,
	@Pswd varchar(50),
	@Role int
AS
	UPDATE WimsUser SET Name = @Name, LastName = @LastName, NickName = @NickName, Email = @Email, IsTwitcher = @IsTwitcher,
	ConditionAccepted = @ConditionAccepted, CurrencyId = @CurrencyId, Avatar =@Avatar, Pswd = @Pswd, RoleId = @Role WHERE Id = @Id;
RETURN 0
GO
-- Étape de refactorisation pour mettre à jour le serveur cible avec des journaux de transactions déployés

IF OBJECT_ID(N'dbo.__RefactorLog') IS NULL
BEGIN
    CREATE TABLE [dbo].[__RefactorLog] (OperationKey UNIQUEIDENTIFIER NOT NULL PRIMARY KEY)
    EXEC sp_addextendedproperty N'microsoft_database_tools_support', N'refactoring log', N'schema', N'dbo', N'table', N'__RefactorLog'
END
GO
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'ee267ec1-a6bc-4b04-bb59-bcdc6aca5145')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('ee267ec1-a6bc-4b04-bb59-bcdc6aca5145')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'bfcacc27-7964-4625-8c89-4329bb778bd8')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('bfcacc27-7964-4625-8c89-4329bb778bd8')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '5125eb0d-f334-45fe-bcce-123719878f12')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('5125eb0d-f334-45fe-bcce-123719878f12')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '26f83778-c86e-47c4-acc3-882bb06ab593')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('26f83778-c86e-47c4-acc3-882bb06ab593')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'c73d8f48-5ad8-47eb-ae9c-f436453bd5bd')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('c73d8f48-5ad8-47eb-ae9c-f436453bd5bd')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'a5299c9e-14f5-4a0b-9903-04bfc40f5e75')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('a5299c9e-14f5-4a0b-9903-04bfc40f5e75')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'ed1d8819-a77f-4dcc-aac0-d46df46fd436')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('ed1d8819-a77f-4dcc-aac0-d46df46fd436')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '6a2e2538-134b-4cb7-b951-0272ccabcd24')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('6a2e2538-134b-4cb7-b951-0272ccabcd24')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'ef2d0a8a-8959-4dd3-acf2-eaca82560c32')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('ef2d0a8a-8959-4dd3-acf2-eaca82560c32')

GO

GO
PRINT N'Vérification de données existantes par rapport aux nouvelles contraintes';


GO
USE [$(DatabaseName)];


GO
ALTER TABLE [dbo].[Auction] WITH CHECK CHECK CONSTRAINT [FK_Auction_ToTable_PriceToWin];

ALTER TABLE [dbo].[PriceToWin] WITH CHECK CHECK CONSTRAINT [FK_PriceToWin_ToTable];

ALTER TABLE [dbo].[PriceToWin] WITH CHECK CHECK CONSTRAINT [FK_PriceToWin_ToTable_1];

ALTER TABLE [dbo].[WimsUser] WITH CHECK CHECK CONSTRAINT [FK_WimsUser_ToTable_Currency];

ALTER TABLE [dbo].[WimsUser] WITH CHECK CHECK CONSTRAINT [FK_WimsUser_ToTable_Role];


GO
PRINT N'Mise à jour terminée.';


GO
