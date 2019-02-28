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
/*
Le type pour la colonne GameImg de la table [dbo].[Game] est actuellement  NVARCHAR (MAX) NULL, mais il est en cours de modification en  VARCHAR (MAX) NULL. Une perte de données est susceptible de se produire.
*/

IF EXISTS (select top 1 1 from [dbo].[Game])
    RAISERROR (N'Lignes détectées. Arrêt de la mise à jour du schéma en raison d''''un risque de perte de données.', 16, 127) WITH NOWAIT

GO
PRINT N'L''opération suivante a été générée à partir d''un fichier journal de refactorisation d5dee4e1-522d-4763-a405-77322be48945';

PRINT N'Renommer [dbo].[PriceToWin].[CurrentWinner] en CurrentBestAuction';


GO
EXECUTE sp_rename @objname = N'[dbo].[PriceToWin].[CurrentWinner]', @newname = N'CurrentBestAuction', @objtype = N'COLUMN';


GO
PRINT N'Suppression de [dbo].[Trigger_Game]...';


GO
DROP TRIGGER [dbo].[Trigger_Game];


GO
PRINT N'Suppression de contrainte sans nom sur [dbo].[Game]...';


GO
ALTER TABLE [dbo].[Game] DROP CONSTRAINT [DF__tmp_ms_xx__Activ__6FE99F9F];


GO
PRINT N'Suppression de [dbo].[FK_PriceToWin_ToTable_1]...';


GO
ALTER TABLE [dbo].[PriceToWin] DROP CONSTRAINT [FK_PriceToWin_ToTable_1];


GO
PRINT N'Début de la régénération de la table [dbo].[Game]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [dbo].[tmp_ms_xx_Game] (
    [Id]       INT           IDENTITY (1, 1) NOT NULL,
    [GameName] NCHAR (50)    NOT NULL,
    [GameImg]  VARCHAR (MAX) NULL,
    [Active]   BIT           DEFAULT 1 NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [dbo].[Game])
    BEGIN
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_Game] ON;
        INSERT INTO [dbo].[tmp_ms_xx_Game] ([Id], [GameName], [GameImg], [Active])
        SELECT   [Id],
                 [GameName],
                 [GameImg],
                 [Active]
        FROM     [dbo].[Game]
        ORDER BY [Id] ASC;
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_Game] OFF;
    END

DROP TABLE [dbo].[Game];

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_Game]', N'Game';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Création de [dbo].[FK_PriceToWin_ToTable_1]...';


GO
ALTER TABLE [dbo].[PriceToWin] WITH NOCHECK
    ADD CONSTRAINT [FK_PriceToWin_ToTable_1] FOREIGN KEY ([GameId]) REFERENCES [dbo].[Game] ([Id]);


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
PRINT N'Modification de [dbo].[AddPriceToWin]...';


GO
ALTER PROCEDURE [dbo].[AddPriceToWin]
	@TwitcherId int,
	@CurrentBestAuction int,
	@AuctionEnd datetime,
	@GameId int,
	@AuctionStartValue int,
	@Active bit
AS
	INSERT INTO PriceToWin(TwitcherId, CurrentBestAuction, AuctionEnd, GameId, AuctionStartValue, Active) 
	VALUES (@TwitcherId, @CurrentBestAuction, @AuctionEnd, @GameId, @AuctionStartValue, @Active);
RETURN 0
GO
PRINT N'Modification de [dbo].[UpdatePriceToWin]...';


GO
ALTER PROCEDURE [dbo].[UpdatePriceToWin]
	@TwitcherId int,
	@CurrentBestAuction int,
	@AuctionEnd datetime,
	@GameId int,
	@AuctionStartValue int,
	@Active bit,
	@Id int

AS
	UPDATE PriceToWin SET TwitcherId = @TwitcherId, CurrentBestAuction = @CurrentBestAuction, AuctionEnd = @AuctionEnd, GameId = @GameId,
	AuctionStartValue = @AuctionStartValue, Active = @Active WHERE Id = @Id;
RETURN 0
GO
PRINT N'Actualisation de [dbo].[AddGame]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[AddGame]';


GO
PRINT N'Actualisation de [dbo].[DeleteGame]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[DeleteGame]';


GO
PRINT N'Actualisation de [dbo].[SelectGame]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[SelectGame]';


GO
PRINT N'Actualisation de [dbo].[SelectGameById]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[SelectGameById]';


GO
PRINT N'Actualisation de [dbo].[UpdateGame]...';


GO
EXECUTE sp_refreshsqlmodule N'[dbo].[UpdateGame]';


GO
-- Étape de refactorisation pour mettre à jour le serveur cible avec des journaux de transactions déployés
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'd5dee4e1-522d-4763-a405-77322be48945')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('d5dee4e1-522d-4763-a405-77322be48945')

GO

GO
PRINT N'Vérification de données existantes par rapport aux nouvelles contraintes';


GO
USE [$(DatabaseName)];


GO
ALTER TABLE [dbo].[PriceToWin] WITH CHECK CHECK CONSTRAINT [FK_PriceToWin_ToTable_1];


GO
PRINT N'Mise à jour terminée.';


GO
