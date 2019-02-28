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
PRINT N'L''opération suivante a été générée à partir d''un fichier journal de refactorisation 3e5c3017-3c79-45fc-a0c2-5f17e743cbc3';

PRINT N'Renommer [dbo].[FK_PriceToWin_ToTable] en FK_BestAuction_ToTableAuction';


GO
EXECUTE sp_rename @objname = N'[dbo].[FK_PriceToWin_ToTable]', @newname = N'FK_BestAuction_ToTableAuction', @objtype = N'OBJECT';


GO
PRINT N'L''opération suivante a été générée à partir d''un fichier journal de refactorisation ae5ef9e3-5b49-4bce-a11f-b35df90da8fc';

PRINT N'Renommer [dbo].[FK_PriceToWin_ToTable_1] en FK_GameId_ToTableGame';


GO
EXECUTE sp_rename @objname = N'[dbo].[FK_PriceToWin_ToTable_1]', @newname = N'FK_GameId_ToTableGame', @objtype = N'OBJECT';


GO
-- Étape de refactorisation pour mettre à jour le serveur cible avec des journaux de transactions déployés
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '3e5c3017-3c79-45fc-a0c2-5f17e743cbc3')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('3e5c3017-3c79-45fc-a0c2-5f17e743cbc3')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'ae5ef9e3-5b49-4bce-a11f-b35df90da8fc')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('ae5ef9e3-5b49-4bce-a11f-b35df90da8fc')

GO

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
