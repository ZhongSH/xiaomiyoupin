/*
 Navicat Premium Data Transfer

 Source Server         : mycon
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : youpin

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 20/05/2019 08:53:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `cid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `gid` int(10) NULL DEFAULT NULL,
  `gname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gprice` int(10) NULL DEFAULT NULL,
  `gnum` int(10) NULL DEFAULT NULL,
  `gimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`cid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 54 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `gid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` int(10) NOT NULL,
  `imgsrc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sale` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`gid`, `price`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, 'HIMO V1 PLUS 电动助力自行车', '通勤代步好搭档，带你在拥堵都市自由穿梭', 2199, '../img/goods/01.png', 1);
INSERT INTO `goods` VALUES (2, '左点小艾智能艾灸盒（套餐版）', '【养生好礼 予亲予己】无烟艾灸，智能防烫，接入米家APP，触摸操作，一键启动，多部位使用，温度可调，随身携带，多种艾灸模式', 2399, '../img/goods/02.png', 0);
INSERT INTO `goods` VALUES (3, '小米净水器（厨下式） 白色', '送安装服务，400加仑大流量，RO反渗透直出纯净水，隐藏安装，健康家庭必备', 1999, '../img/goods/03.png', 1);
INSERT INTO `goods` VALUES (4, '邦先生智能晾衣机', '持续暖风烘干，30KG承重能力，一键升降，小户型不占地儿，米家APP连接，小爱同学语音控制，铝合金材质', 4396, '../img/goods/04.png', 1);
INSERT INTO `goods` VALUES (5, '左点小艾智能艾灸盒（套餐版）', '【养生好礼 予亲予己】无烟艾灸，智能防烫，接入米家APP，触摸操作，一键启动，多部位使用，温度可调，随身携带，多种艾灸模式', 2399, '../img/goods/02.png', 0);
INSERT INTO `goods` VALUES (6, '邦先生智能晾衣机', '持续暖风烘干，30KG承重能力，一键升降，小户型不占地儿，米家APP连接，小爱同学语音控制，铝合金材质', 4396, '../img/goods/04.png', 1);
INSERT INTO `goods` VALUES (7, 'HIMO V1 PLUS 电动助力自行车', '通勤代步好搭档，带你在拥堵都市自由穿梭', 2199, '../img/goods/01.png', 1);
INSERT INTO `goods` VALUES (8, '小米净水器（厨下式） 白色', '送安装服务，400加仑大流量，RO反渗透直出纯净水，隐藏安装，健康家庭必备', 1999, '../img/goods/03.png', 0);
INSERT INTO `goods` VALUES (9, 'HIMO V1 PLUS 电动助力自行车', '通勤代步好搭档，带你在拥堵都市自由穿梭', 2199, '../img/goods/01.png', 1);
INSERT INTO `goods` VALUES (10, '左点小艾智能艾灸盒（套餐版）', '【养生好礼 予亲予己】无烟艾灸，智能防烫，接入米家APP，触摸操作，一键启动，多部位使用，温度可调，随身携带，多种艾灸模式', 2399, '../img/goods/02.png', 0);
INSERT INTO `goods` VALUES (11, '小米净水器（厨下式） 白色', '送安装服务，400加仑大流量，RO反渗透直出纯净水，隐藏安装，健康家庭必备', 1999, '../img/goods/03.png', 0);
INSERT INTO `goods` VALUES (12, '邦先生智能晾衣机', '持续暖风烘干，30KG承重能力，一键升降，小户型不占地儿，米家APP连接，小爱同学语音控制，铝合金材质', 4396, '../img/goods/04.png', 0);
INSERT INTO `goods` VALUES (13, '左点小艾智能艾灸盒（套餐版）', '【养生好礼 予亲予己】无烟艾灸，智能防烫，接入米家APP，触摸操作，一键启动，多部位使用，温度可调，随身携带，多种艾灸模式', 2399, '../img/goods/02.png', 0);
INSERT INTO `goods` VALUES (14, '邦先生智能晾衣机', '持续暖风烘干，30KG承重能力，一键升降，小户型不占地儿，米家APP连接，小爱同学语音控制，铝合金材质', 4396, '../img/goods/04.png', 1);
INSERT INTO `goods` VALUES (15, 'HIMO V1 PLUS 电动助力自行车', '通勤代步好搭档，带你在拥堵都市自由穿梭', 2199, '../img/goods/01.png', 0);
INSERT INTO `goods` VALUES (16, '小米净水器（厨下式） 白色', '送安装服务，400加仑大流量，RO反渗透直出纯净水，隐藏安装，健康家庭必备', 1999, '../img/goods/03.png', 0);
INSERT INTO `goods` VALUES (17, 'HIMO V1 PLUS 电动助力自行车', '通勤代步好搭档，带你在拥堵都市自由穿梭', 2199, '../img/goods/01.png', 0);
INSERT INTO `goods` VALUES (18, '左点小艾智能艾灸盒（套餐版）', '【养生好礼 予亲予己】无烟艾灸，智能防烫，接入米家APP，触摸操作，一键启动，多部位使用，温度可调，随身携带，多种艾灸模式', 2399, '../img/goods/02.png', 0);
INSERT INTO `goods` VALUES (19, '小米净水器（厨下式） 白色', '送安装服务，400加仑大流量，RO反渗透直出纯净水，隐藏安装，健康家庭必备', 1999, '../img/goods/03.png', 0);
INSERT INTO `goods` VALUES (20, '邦先生智能晾衣机', '持续暖风烘干，30KG承重能力，一键升降，小户型不占地儿，米家APP连接，小爱同学语音控制，铝合金材质', 4396, '../img/goods/04.png', 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `psw` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'user', NULL, 'psw');
INSERT INTO `user` VALUES (2, 'name', '13800138000', '123456');
INSERT INTO `user` VALUES (3, 'asd', '', 'asd123');
INSERT INTO `user` VALUES (4, '用户名', '13664936009', 'aaa123');

SET FOREIGN_KEY_CHECKS = 1;
