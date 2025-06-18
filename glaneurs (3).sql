-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 18 juin 2025 à 12:41
-- Version du serveur : 5.7.24
-- Version de PHP : 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `glaneurs`
--

-- --------------------------------------------------------

--
-- Structure de la table `archives`
--

CREATE TABLE `archives` (
  `id` int(11) NOT NULL,
  `archives_titre` varchar(255) NOT NULL,
  `archives_src` varchar(255) NOT NULL,
  `archives_date` varchar(255) NOT NULL,
  `archives_auteur` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `archives`
--

INSERT INTO `archives` (`id`, `archives_titre`, `archives_src`, `archives_date`, `archives_auteur`) VALUES
(1, 'Chiffonnier', 'img/archives/1960-Chiffonnier.jpg', '1960', 'À remplir'),
(2, 'chiffonniers', 'img/archives/1960-chiffonniers.jpg', '1960', 'À remplir'),
(3, 'Remise de l\'état 1', 'img/archives/1961-remise-etat-1.JPG', '1961', 'À remplir'),
(4, 'Remise de l\'état 2', 'img/archives/1961-remise-etat-2.JPG', '1961', 'À remplir'),
(5, 'Remise de l\'état 3', 'img/archives/1961-remise-etat-3.JPG', '1961', 'À remplir'),
(6, 'Remise de l\'état 4', 'img/archives/1961-remise-etat-4.JPG', '1961', 'À remplir'),
(7, 'chiffonnier', 'img/archives/1969-chiffonnier.png', '1969', 'À remplir'),
(8, 'Bidonville 2', 'img/archives/1973-bidonville-2.jpg', '1973', 'À remplir'),
(9, 'Bidonville', 'img/archives/1973-bidonville.jpg', '1973', 'À remplir'),
(10, 'Chariot de Chiffoniers', 'img/archives/1973-chariot-chiffonnier.jpg', '1973', 'À remplir'),
(11, 'Chiffoniers et Cartons', 'img/archives/1973-chiffonnier-cartons.jpg', '1973', 'À remplir'),
(12, 'Chiffonier', 'img/archives/1973-chiffonnier.jpg', '1973', 'À remplir'),
(13, 'Pere Jungilwoo', 'img/archives/1973-pere-jungilwoo.jpg', '1973', 'À remplir'),
(14, 'Porteuse Bidonville', 'img/archives/1973-porteuse-bidonville.jpg', '1973', 'À remplir'),
(15, 'Chiffoniers et Cartons', 'img/archives/1976-chiffonnier-cartons.jpeg', '1976', 'À remplir'),
(16, 'Collecteur et déchets', 'img/archives/1978-collecteur-dechets.jpg', '1978', 'À remplir');

-- --------------------------------------------------------

--
-- Structure de la table `team_members`
--

CREATE TABLE `team_members` (
  `id` int(11) NOT NULL,
  `nom_fr` varchar(255) NOT NULL,
  `nom_en` varchar(255) NOT NULL,
  `nom_kr` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `portfolio` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `team_members`
--

INSERT INTO `team_members` (`id`, `nom_fr`, `nom_en`, `nom_kr`, `image`, `portfolio`) VALUES
(1, 'Sakina DOUIOU', 'Sakina DOUIOU', '사키나 두이우', 'img/equipe/membre2.jpg', 'https://sakinadouiou.github.io'),
(2, 'Xuan-Minh TRAN', 'Xuan-Minh TRAN', '슈안-민 트란', 'img/equipe/membre1.jpg', 'https://xuan-minh.github.io/'),
(3, 'Dylan BLANDEL', 'Dylan BLANDEL', '딜란 브랑델', 'img/equipe/membre2.jpg', 'https://www.linkedin.com/in/dylan-blandel-12991b187?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'),
(4, 'Hyunbeom PARK ', 'Hyunbeom PARK ', '박현범', 'img/equipe/membre1.jpg', ''),
(5, 'Hugo LEULIET', 'Hugo LEULIET', '위고 르리애', 'img/equipe/membre2.jpg', 'https://pepi934.github.io/HugoLeuliet_Portfolio/'),
(6, 'Romane VARO-TUPIN', 'Romane VARO-TUPIN', '로만 바로-튀팡', 'img/equipe/membre1.jpg', ''),
(7, 'Jiwoo YUN', 'Jiwoo YUN', '윤지우', 'img/equipe/membre2.jpg', ''),
(8, 'Suyeon YANG', 'Suyeon YANG', '양수연', 'img/equipe/membre1.jpg', ''),
(9, 'Alyssia BERSET', 'Alyssia BERSET', '알리시아 베르세', 'img/equipe/membre1.jpg', ''),
(10, 'Inès DOS SANTOS', 'Inès DOS SANTOS', '이녜스 도스 산토스', 'img/equipe/membre1.jpg', ''),
(11, 'Sarah CROS', 'Sarah CROS', '사라 그로스', 'img/equipe/membre2.jpg', 'https://www.linkedin.com/in/sarahcros'),
(12, 'Jaeden DUONG', 'Jaeden DUONG', '제든 뒤옹', 'img/equipe/membre1.jpg', ''),
(13, 'Jiyeong SHIN ', 'Jiyeong SHIN ', '신지영', 'img/equipe/membre2.jpg', ''),
(14, 'Junghyun LIM', 'Junghyun LIM', '임정현', 'img/equipe/membre2.jpg', ''),
(15, 'Stéphane LEVY', 'Stéphane LEVY', '스테판레비', 'img/equipe/membre1.jpg', 'https://stephanelevy.net/?lang=fr#'),
(16, 'Gihoon YU', 'Gihoon YU', '유기훈', 'img/equipe/membre1.jpg', '');

-- --------------------------------------------------------

--
-- Structure de la table `team_roles`
--

CREATE TABLE `team_roles` (
  `id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `key_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `team_roles`
--

INSERT INTO `team_roles` (`id`, `member_id`, `key_name`) VALUES
(1, 1, 'real'),
(2, 1, 'directrice_pj'),
(3, 1, 'scenariste'),
(4, 1, 'photographe'),
(5, 1, 'chef_op'),
(7, 1, 'monteuse'),
(8, 1, 'etalonnage'),
(9, 1, 'reperage'),
(10, 2, 'directeur_pj'),
(11, 2, 'dev_wb'),
(12, 2, 'contact_prise'),
(13, 2, 'tech_sonore'),
(14, 2, 'interprete'),
(15, 2, 'perch_man'),
(16, 2, 'reperage'),
(17, 3, 'res_montageFR'),
(18, 3, 'scenariste'),
(19, 3, 'graphiste'),
(20, 3, 'cadreur'),
(21, 4, 'compositeur_bo'),
(22, 4, 'monteur_son'),
(23, 4, 'interpreteKR'),
(24, 4, 'reperage'),
(25, 5, 'perch_man'),
(26, 5, 'monteur_son'),
(27, 5, 'compositeur_bo'),
(28, 6, 'recherche'),
(29, 6, 'transcription'),
(30, 6, 'contact_prise'),
(31, 6, 'sous_titres'),
(32, 6, 'orga'),
(33, 7, 'reperage'),
(34, 7, 'transcription'),
(35, 8, 'interprete'),
(36, 8, 'reperage'),
(37, 9, 'res_montageKR'),
(38, 9, 'reperage'),
(39, 9, 'interprete'),
(40, 10, 'webmaster'),
(41, 10, 'uxui'),
(42, 10, 'maquettiste'),
(43, 10, 'graphiste'),
(44, 11, 'graphiste'),
(45, 11, 'uxui'),
(46, 11, 'maquettiste'),
(47, 11, 'monteuse'),
(48, 12, 'reperage'),
(49, 12, 'transcription'),
(50, 12, 'trad'),
(51, 14, 'perch_man'),
(52, 14, 'cadreur'),
(53, 14, 'reperage'),
(54, 13, 'interprete'),
(55, 13, 'transcription'),
(56, 13, 'reperage'),
(57, 15, 'enseignant'),
(58, 15, 'tutrice'),
(59, 16, 'enseignant'),
(60, 16, 'traducteur'),
(62, 1, 'recherche'),
(63, 6, 'assistante_prod');

-- --------------------------------------------------------

--
-- Structure de la table `translations`
--

CREATE TABLE `translations` (
  `id` int(11) NOT NULL,
  `key_name` varchar(100) NOT NULL,
  `fr` text,
  `en` text,
  `kr` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `translations`
--

INSERT INTO `translations` (`id`, `key_name`, `fr`, `en`, `kr`) VALUES
(1, 'index_titre', 'Les glaneurs de carton', 'Cardboard gleaners', '폐지 줍는 사람들'),
(2, 'index_docufull', 'Voir le documentaire', 'Watch the documentary', '다큐멘터리 관람하기'),
(3, 'index_chapitre1', 'Chapitre 1', 'Chapter 1', '1장'),
(4, 'index_chapitre2', 'Chapitre 2', 'Chapter 2', '2장'),
(5, 'index_chapitre3', 'Chapitre 3', 'Chapter 3', '3장'),
(6, 'portraits_titre', 'Portraits', 'Portraits', '인물 소개'),
(7, 'archives_titre', 'Archives', 'Archives', '아카이브'),
(8, 'souvenirs_titre', 'Souvenirs', 'Memories', '추억'),
(9, 'associations_titre', 'Associations', 'Associations', '단체'),
(10, 'derriereledocumentaire_titre', 'Derrière le documentaire', 'Behind the documentary', '다큐멘터리 뒤에'),
(11, 'mentionslegales_titre', 'Mentions légales', 'Legal notice', '법적 고지'),
(12, 'accueil', 'Accueil', 'Home', '홈'),
(13, 'real', 'Réalisatrice', 'Director', '감독'),
(14, 'directrice_pj', 'Directrice de projet', 'Project Manager', '프로젝트 매니저'),
(15, 'scenariste', 'Scénariste', 'Screenwriter', '시나리오 작가'),
(16, 'photographe', 'Photographe', 'Photographer', '사진작가'),
(17, 'chef_op', 'Chef opératrice', 'Director of Photography', '촬영 감독'),
(18, 'cadreuse', 'Cadreuse', 'Camera Operator', '카메라 오퍼레이터'),
(19, 'monteuse', 'Monteuse', 'Editor', '편집자'),
(20, 'etalonnage', 'Étalonnage', 'Color grading', '색 보정'),
(21, 'reperage', 'Repérage', 'Location scouting', '로케이션 헌팅'),
(22, 'directeur_pj', 'Directeur de projet', 'Project Manager', '프로젝트 매니저'),
(23, 'dev_wb', 'Développeur web', 'Web Developer', '웹 개발자'),
(24, 'contact_prise', 'Prise de contact', 'Contact initiation', '연락 시작'),
(25, 'tech_sonore', 'Technicien sonore', 'Sound Technician', '음향 기사'),
(26, 'interprete', 'Interprète', 'Interpreter', '통역사'),
(27, 'perch_man', 'Perch-man', 'Boom Operator', '붐 마이크 오퍼레이터'),
(28, 'res_montageFR', 'Responsable montage français', 'French Editing Supervisor', '프랑스 편집 책임자'),
(29, 'graphiste', 'Graphiste', 'Graphic Designer', '그래픽 디자이너'),
(30, 'compositeur_bo', 'Compositeur musique originale', 'Original Music Composer', '오리지널 음악 작곡가'),
(31, 'monteur_son', 'Monteur son', 'Sound Editor', '사운드 편집자'),
(32, 'interpreteKR', 'Interprète coréen', 'Korean Interpreter', '한국어 통역사'),
(33, 'assistante_prod', 'Assistante de production', 'Production Assistant', '제작 보조'),
(34, 'orga', 'Organisatrice', 'Organizer', '기획자'),
(35, 'transcription', 'Transcription', 'Transcription', '필기록'),
(36, 'sous_titres', 'Sous-titreuse', 'Subtitle Editor', '자막 편집자'),
(37, 'res_montageKR', 'Responsable montage coréen', 'Korean Editing Supervisor', '한국 편집 책임자'),
(38, 'webmaster', 'Webmaster', 'Webmaster', '웹마스터'),
(39, 'uxui', 'UX/UI Designer', 'UX/UI Designer', 'UX/UI 디자이너'),
(40, 'maquettiste', 'Maquettiste', 'Layout Designer', '레이아웃 디자이너'),
(41, 'trad', 'Traductrice', 'Translator', '번역가'),
(42, 'enseignant', 'Corps enseignant', 'Teaching Staff', '교직원'),
(43, 'tutrice', 'Tutrice', 'Tutor', '튜터'),
(44, 'portfolio', 'Portfolio', 'Portfolio', '포트폴리오'),
(45, 'monteur', 'Monteur ', 'Editor', '편집자'),
(46, 'cadreur', 'Cadreur', 'Camera Operator', '카메라 오퍼레이터'),
(47, 'derriereledocumentaire_intro', 'Notre documentaire est le fruit d\'un travail collectif, guidé par une vision commune : \r\ndonner la parole à ceux qu\'on n\'entend jamais, et révéler la dignité chaque histoire. \r\nDécouvre l\'équipe qui porte cette direction artistique et humaine', 'Our documentary is the result of a collective effort, guided by a shared vision: \r\ngiving a voice to those who are never heard, and revealing the dignity in every story. \r\nDiscover the team behind this artistic and human vision.', '우리 다큐멘터리는 공통된 비전을 바탕으로 한 공동 작업의 결과입니다.\r\n절대 들리지 않는 이들에게 목소리를 전하고,\r\n모든 이야기에 담긴 존엄성을 드러내는 것이 그 비전입니다.\r\n이 예술적이고 인간적인 방향을 이끄는 팀을 만나보세요.'),
(48, 'portraits_master', 'WON Yong-chul', 'WON Yong-chul', '원용철'),
(49, 'portraits_lee', 'LEE Sang-man', 'LEE Sang-man', '이상만'),
(50, 'portraits_jo', 'JO Cheon-rae', 'JO Cheon-rae', '조천래'),
(51, 'portraits_voirlesautres', 'Voir les autres portraits', 'View other portraits', '다른 인물 사진 보기'),
(52, 'derriereledocumentaire_messagemerci', 'Tous les membres de l\'équipe tiennent à remercier chaleureusement les personnes suivantes pour leur soutien et leur contribution précieuse à ce projet :', 'All members of the team would like to warmly thank the following people for their support and valuable contribution to this project:', '모든 팀원들은 이 프로젝트에 지원과 소중한 기여를 해주신 다음 분들께 진심으로 감사의 말씀을 드립니다:'),
(53, 'remerciements_titre', 'Remerciements', 'Acknowledgements', '감사'),
(54, 'mentionslegales_nom_entreprise', 'Glaneurs de carton', 'Cardboard Gleaners', '박스 줍는 사람들'),
(55, 'mentionslegales_directeur_titre', 'Directeur de la publication :', 'Publication Director:', '발행 책임자:'),
(56, 'mentionslegales_hebergeur_titre', 'Hébergeur :', 'Host:', '호스트:'),
(57, 'mentionslegales_hebergeur_nom', 'AXINET', 'AXINET', 'AXINET'),
(58, 'mentionslegales_hebergeur_adresse_ip', 'support@axinet.fr', 'support@axinet.fr', 'support@axinet.fr'),
(59, 'mentionslegales_hebergeur_telephone', 'Téléphone : 04 56 38 15 15', 'Phone: +334 56 38 15 15', '전화: +334 56 38 15 15'),
(60, 'mentionslegales_propriete_intellectuelle_titre', 'Propriété intellectuelle :', 'Intellectual Property:', '지적 재산권:'),
(61, 'mentionslegales_propriete_intellectuelle_texte', 'Voici les détails des licences applicables à chaque type de contenu sur ce site :<br><br>\nLe film documentaire est distribué sous licence Creative Commons Attribution - Pas d’Utilisation Commerciale - Partage dans les Mêmes Conditions 4.0 International (CC BY-NC-SA 4.0). Vous êtes autorisé à le partager, l\'adapter et le remixer à des fins non commerciales, tant que vous nous créditez et que vous distribuez vos créations sous des conditions identiques.<br><br>\nLes bandes sonores et les productions musicales sont mises à disposition sous licence Creative Commons Attribution - Pas d’Utilisation Commerciale 4.0 International (CC BY-NC 4.0). Vous pouvez les utiliser et les partager à des fins non commerciales, à condition de créditer Les glaneurs de carton comme l\'auteur original.<br><br>\nL\'intégralité du code source et de l’interface de ce site web sont sous licence Creative Commons Attribution - Pas d’Utilisation Commerciale - Partage dans les Mêmes Conditions 4.0 International (CC BY-NC-SA 4.0). Vous êtes libre de le partager et de l\'adapter à des fins non commerciales, à condition de nous créditer et de diffuser vos contributions sous des conditions identiques.<br><br>\n\nToutes les photographies réalisées par Sakina DOUIOU sont la pleine et entière propriété de leur auteur. Elles sont protégées par le Droit d\'Auteur (Copyright). Toute reproduction, représentation, diffusion ou modification est strictement interdite sans l\'autorisation écrite préalable de Sakina DOUIOU.<br><br>', 'Here are the details of the licenses applicable to each type of content on this site:<br><br>\n\nThe documentary film is distributed under a Creative Commons Attribution - NonCommercial - ShareAlike 4.0 International (CC BY-NC-SA 4.0) license You are authorized to share, adapt, and remix it for non-commercial purposes, as long as you credit us and distribute your creations under identical terms<br><br>\n\nThe soundtracks and musical productions are made available under a Creative Commons Attribution - NonCommercial 4.0 International (CC BY-NC 4.0) license You may use and share them for non-commercial purposes, provided you credit Les glaneurs de carton as the original author<br><br>\n\nThe entirety of this website\'s source code and interface are licensed under a Creative Commons Attribution - NonCommercial - ShareAlike 4.0 International (CC BY-NC-SA 4.0) license You are free to share and adapt it for non-commercial purposes, provided you credit us and distribute your contributions under identical terms<br><br>\n\nAll photographs taken by Sakina DOUIOU are the full and exclusive property of their author They are protected by Copyright Law Any reproduction, representation, distribution, or modification is strictly prohibited without the prior written authorization of Sakina DOUIOU<br><br>', '이 웹사이트의 각 콘텐츠 유형에 적용되는 라이선스 세부 정보는 다음과 같습니다<br><br>\n\n다큐멘터리 영화는 크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 (CC BY-NC-SA 4.0) 라이선스에 따라 배포됩니다 비영리 목적으로 공유, 각색 및 리믹스할 수 있으며, 이 경우 당사를 출처로 표시하고 동일한 조건으로 귀하의 창작물을 배포해야 합니다<br><br>\n\n사운드트랙 및 음악 제작물은 크리에이티브 커먼즈 저작자표시-비영리 4.0 국제 (CC BY-NC 4.0) 라이선스에 따라 제공됩니다 비영리 목적으로 사용 및 공유할 수 있으며, 이 경우 Les glaneurs de carton을 원저작자로 표시해야 합니다<br><br>\n\n이 웹사이트의 전체 소스 코드 및 인터페이스는 크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 (CC BY-NC-SA 4.0) 라이선스에 따라 라이선스됩니다 비영리 목적으로 자유롭게 공유하고 각색할 수 있으며, 이 경우 당사를 출처로 표시하고 동일한 조건으로 귀하의 기여물을 배포해야 합니다<br><br>\n\nSakina DOUIOU가 촬영한 모든 사진은 저작자의 완전하고 독점적인 재산입니다 이들은 저작권법에 의해 보호됩니다 Sakina DOUIOU의 사전 서면 승인 없이는 어떠한 복제, 표현, 배포 또는 수정도 엄격히 금지됩니다'),
(62, 'mentionslegales_donnees_personnelles_titre', 'Données personnelles :', 'Personal Data:', '개인 데이터:'),
(63, 'mentionslegales_donnees_personnelles_texte', 'Ce site ne collecte pas de données personnelles à l’insu des utilisateurs. Pour toute question, contactez-nous à l’adresse ci-dessus.', 'This site does not collect personal data without the users\' knowledge. For any questions, contact us at the address above.', '본 사이트는 사용자 몰래 개인 데이터를 수집하지 않습니다. 문의 사항은 위 주소로 연락해 주십시오.'),
(64, 'mentionslegales_editeur', 'Éditeur du site :', 'Site publisher :', '사이트 게시자 :'),
(65, 'loading_def_titre', '‘glaneur,-euse’, nom,', '‘gleaner’, noun,', '‘줍는 사람’, 명사,'),
(66, 'loading_def_texte', 'Personne qui glane, c\'est-à-dire qui ramasse des choses. Personne qui traîne à la fin des marchés pour récupérer les produits qui ont été jetés aux ordures.', 'A person who gleans, i.e., who collects things. A person who lingers at the end of markets to pick up discarded produce.', '물건을 줍는 사람, 즉 물건을 모으는 사람. 시장이 끝날 무렵 쓰레기로 버려진 물건들을 주우러 다니는 사람.'),
(68, 'loading_production', 'Une production de', 'A production by', '제작'),
(69, 'loading_casque_message', 'Veuillez mettre un casque pour profiter d\'une meilleure expérience', 'Please wear headphones for a better experience', '더 나은 경험을 위해 헤드폰을 착용해 주십시오'),
(70, 'mentionslegales_conception', 'Conception', 'Design', '디자인'),
(71, 'mentionslegales_dvt', 'Developpement', 'Web Development', '개발'),
(72, 'entrer', 'Entrer', 'Enter', '방문하다'),
(73, 'recherche', 'Responsable recherche', 'Research Manager', '연구 관리자'),
(74, 'traducteur', 'Traducteur', 'Translator', '역자');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `archives`
--
ALTER TABLE `archives`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `team_roles`
--
ALTER TABLE `team_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Index pour la table `translations`
--
ALTER TABLE `translations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `archives`
--
ALTER TABLE `archives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `team_roles`
--
ALTER TABLE `team_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT pour la table `translations`
--
ALTER TABLE `translations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `team_roles`
--
ALTER TABLE `team_roles`
  ADD CONSTRAINT `team_roles_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `team_members` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
