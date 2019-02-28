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
PRINT N'Modification de [dbo].[UpdatePriceToWin]...';


GO
ALTER PROCEDURE [dbo].[UpdatePriceToWin]
	@CurrentBestAuction int = null,
	@OfferEnd datetime,
	@GameId int,
	@AuctionStartValue int,
	@Active bit,
	@Id int

AS
	UPDATE PriceToWin SET CurrentBestAuction = @CurrentBestAuction, OfferEnd = @OfferEnd, GameId = @GameId,
	AuctionStartValue = @AuctionStartValue, Active = @Active WHERE Id = @Id;
RETURN 0
GO
--Set Identity_Insert Role On;

--INSERT INTO Role (Id, RoleName) VALUES
--(1, 'Streamer'),
--(2, 'Viewer');

--Set Identity_Insert Role Off;
GO

GO
PRINT N'Mise à jour terminée.';


GO
