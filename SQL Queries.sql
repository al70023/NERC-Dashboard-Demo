-- Database: Nerc_Dashboard_Demo_DB

-- DROP DATABASE IF EXISTS "Nerc_Dashboard_Demo_DB";

CREATE DATABASE "Nerc_Dashboard_Demo_DB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	
	
	
------------------------- ASSET INVENTORY TABLE -----------------------------	


	
CREATE TABLE asset_inventory (
	"id" 					serial 			PRIMARY KEY,
	"status" 				VARCHAR(256),
	"serial_number" 		VARCHAR(256),
	"name"					VARCHAR(256),
	"IPs" 					VARCHAR(256),
	"OS"					VARCHAR(256),
	"team"					VARCHAR(256),
	"tech_owner"			VARCHAR(256),
	"model_type"			VARCHAR(256),
	"manufacturer"  		VARCHAR(256),
	"model"					VARCHAR(256),
	"group"					VARCHAR(256),
	"bes_class"				VARCHAR(256),
	"impact_rating" 		VARCHAR(256),
	"rack"					VARCHAR(256),
	"location"				VARCHAR(256),
	"psp_id"				VARCHAR(256),
	"esp_id"				VARCHAR(256),
	"function"				VARCHAR(256),
	"commission_date" 		DATE,
	"decommission_date" 	DATE
);




INSERT INTO asset_inventory (
  "status",
  "serial_number",
  "name",
  "IPs",
  "OS",
  "team",
  "tech_owner",
  "model_type",
  "manufacturer",
  "model",
  "group",
  "bes_class",
  "impact_rating",
  "rack",
  "location",
  "psp_id",
  "esp_id",
  "function",
  "commission_date",
  "decommission_date"
) VALUES
('Active', 'SN123456', 'Computer 1', '192.168.1.1', 'Windows Server 2016', 'IT Team', 'John Doe', 'Server', 'ABC Corp', 'Model XYZ', 'IT Equipment', 'Class A', 'High', 'Rack001', 'Server Room', 'PSP001', 'ESP001', 'File Server', '2023-01-11', NULL),
('Active', 'SN789012', 'Server123', '192.168.1.2', 'Windows', 'IT Team', 'Jane Doe', 'Server', 'XYZ Corp', 'Model ABC', 'IT Equipment', 'Class B', 'Medium', 'Rack002', 'Server Room', 'PSP002', 'ESP002', 'Web Server', '2023-01-12', NULL),
('Offline', 'SN345678', 'Printer456', '192.168.1.3', 'PrintOS', 'Printing Team', 'Bob Smith', 'Printer', 'DEF Inc', 'Model DEF', 'Office Equipment', 'Class C', 'Low', 'Rack003', 'Printing Room', 'PSP003', 'ESP003', 'Office Printer', '2023-01-13', '2023-02-01'),
('Active', 'SN901234', 'Desktop789', '192.168.1.4', 'Windows', 'IT Team', 'Alex Johnson', 'Desktop', 'GHI Ltd', 'Model GHI', 'IT Equipment', 'Class A', 'High', 'Rack004', 'Office Floor', 'PSP004', 'ESP004', 'Office Desktop', '2023-01-14', NULL),
('Active', 'SN567890', 'SwitchABC', '192.168.1.5', 'Cisco IOS', 'Networking Team', 'Sam Wilson', 'Switch', 'JKL Corp', 'Model JKL', 'Networking Equipment', 'Class B', 'Medium', 'Rack005', 'Network Room', 'PSP005', 'ESP005', 'Network Switch', '2023-01-15', NULL),
('Decommissioned', 'SN123456', 'LaptopXYZ', '192.168.1.6', 'Windows', 'IT Team', 'Emily White', 'Laptop', 'MNO Inc', 'Model MNO', 'IT Equipment', 'Class C', 'Low', 'Rack006', 'Office Floor', 'PSP006', 'ESP006', 'Office Laptop', '2023-01-16', '2023-02-10'),
('Active', 'SN789012', 'Server123', '192.168.1.7', 'Linux', 'IT Team', 'John Doe', 'Server', 'ABC Corp', 'Model XYZ', 'IT Equipment', 'Class A', 'High', 'Rack007', 'Server Room', 'PSP007', 'ESP007', 'File Server', '2023-01-17', NULL),
('Active', 'SN345678', 'Printer456', '192.168.1.8', 'PrintOS', 'Printing Team', 'Bob Smith', 'Printer', 'DEF Inc', 'Model DEF', 'Office Equipment', 'Class B', 'Medium', 'Rack008', 'Printing Room', 'PSP008', 'ESP008', 'Office Printer', '2023-01-18', NULL),
('Offline', 'SN901234', 'Desktop789', '192.168.1.9', 'Windows', 'IT Team', 'Alex Johnson', 'Desktop', 'GHI Ltd', 'Model GHI', 'IT Equipment', 'Class A', 'High', 'Rack009', 'Office Floor', 'PSP009', 'ESP009', 'Office Desktop', '2023-01-19', NULL),
('Decommissioned', 'SN567890', 'SwitchABC', '192.168.1.10', 'Cisco IOS', 'Networking Team', 'Sam Wilson', 'Switch', 'JKL Corp', 'Model JKL', 'Networking Equipment', 'Class C', 'Low', 'Rack010', 'Network Room', 'PSP010', 'ESP010', 'Network Switch', '2023-01-20', '2023-02-15'),
('Active', 'SN123456', 'LaptopXYZ', '192.168.1.11', 'Windows', 'IT Team', 'Emily White', 'Laptop', 'MNO Inc', 'Model MNO', 'IT Equipment', 'Class A', 'High', 'Rack011', 'Office Floor', 'PSP011', 'ESP011', 'Office Laptop', '2023-01-21', NULL),
('Active', 'SN789012', 'Server123', '192.168.1.12', 'Linux', 'IT Team', 'John Doe', 'Server', 'ABC Corp', 'Model XYZ', 'IT Equipment', 'Class B', 'Medium', 'Rack012', 'Server Room', 'PSP012', 'ESP012', 'File Server', '2023-01-22', NULL),
('Offline', 'SN345678', 'Printer456', '192.168.1.13', 'PrintOS', 'Printing Team', 'Bob Smith', 'Printer', 'DEF Inc', 'Model DEF', 'Office Equipment', 'Class C', 'Low', 'Rack013', 'Printing Room', 'PSP013', 'ESP013', 'Office Printer', '2023-01-23', '2023-03-01'),
('Active', 'SN901234', 'Desktop789', '192.168.1.14', 'Windows', 'IT Team', 'Alex Johnson', 'Desktop', 'GHI Ltd', 'Model GHI', 'IT Equipment', 'Class A', 'High', 'Rack014', 'Office Floor', 'PSP014', 'ESP014', 'Office Desktop', '2023-01-24', NULL),
('Active', 'SN567890', 'SwitchABC', '192.168.1.15', 'Cisco IOS', 'Networking Team', 'Sam Wilson', 'Switch', 'JKL Corp', 'Model JKL', 'Networking Equipment', 'Class B', 'Medium', 'Rack015', 'Network Room', 'PSP015', 'ESP015', 'Network Switch', '2023-01-25', NULL);


SELECT * FROM asset_inventory;



------------------------- END OF ASSET INVENTORY TABLE -----------------------------	



-------------------------------- PORTS TABLE ---------------------------------------



CREATE TABLE ports (
	"id" 					serial 			PRIMARY KEY,
	"number" 				VARCHAR(256),
	"name"					VARCHAR(256),
	"allows" 				VARCHAR(256),
	"description"			VARCHAR(256),
);



INSERT INTO ports ("number", "name", "allows", "description")
VALUES
('81', 'HTTP', 'TCP', 'Port for HTTP traffic'),
('443', 'HTTPS', 'TCP', 'Port for HTTPS traffic'),
('22', 'SSH', 'TCP', 'Secure Shell protocol'),
('3389', 'RDP', 'TCP', 'Remote Desktop Protocol'),
('25', 'SMTP', 'TCP', 'Simple Mail Transfer Protocol'),
('110', 'POP3', 'TCP', 'Post Office Protocol version 3'),
('21', 'FTP', 'TCP', 'File Transfer Protocol'),
('53', 'DNS', 'UDP', 'Domain Name System'),
('161', 'SNMP', 'UDP', 'Simple Network Management Protocol'),
('1433', 'SQL', 'TCP', 'Structured Query Language');


SELECT * FROM ports;








-------------------------------- END OF PORTS TABLE ---------------------------------------


-------------------------------- PORTS TO ASSET TABLE ---------------------------------------



CREATE TABLE ports_to_asset (
	"port_id" 				INT 			REFERENCES ports(id),
	"asset_id" 				INT 			REFERENCES asset_inventory(id),
	"justification"			VARCHAR(256),
	"vendor_docs"			VARCHAR(256)
);


INSERT INTO ports_to_asset ("port_id", "asset_id", "justification", "vendor_docs")
VALUES
-- Asset ID 16
(1, 16, 'HTTP port for web server', 'Link to HTTP documentation'),
(2, 16, 'HTTPS port for secure web server', 'Link to HTTPS documentation'),
(3, 16, 'SSH port for secure remote access', 'Link to SSH documentation'),
(4, 16, 'RDP port for remote desktop access', 'Link to RDP documentation'),
(5, 16, 'SMTP port for email communication', 'Link to SMTP documentation'),
(6, 16, 'POP3 port for email retrieval', 'Link to POP3 documentation'),
(7, 16, 'FTP port for file transfer', 'Link to FTP documentation'),
(8, 16, 'DNS port for domain name resolution', 'Link to DNS documentation'),
(9, 16, 'SNMP port for network management', 'Link to SNMP documentation'),
(10, 16, 'SQL port for database communication', 'Link to SQL documentation'),

-- Asset ID 17
(1, 17, 'HTTP port for web server', 'Link to HTTP documentation'),
(2, 17, 'HTTPS port for secure web server', 'Link to HTTPS documentation'),
(3, 17, 'SSH port for secure remote access', 'Link to SSH documentation'),
(4, 17, 'RDP port for remote desktop access', 'Link to RDP documentation'),
(5, 17, 'SMTP port for email communication', 'Link to SMTP documentation'),
(6, 17, 'POP3 port for email retrieval', 'Link to POP3 documentation'),
(7, 17, 'FTP port for file transfer', 'Link to FTP documentation'),
(8, 17, 'DNS port for domain name resolution', 'Link to DNS documentation'),
(9, 17, 'SNMP port for network management', 'Link to SNMP documentation'),
(10, 17, 'SQL port for database communication', 'Link to SQL documentation'),

-- Asset ID 18
(1, 18, 'HTTP port for web server', 'Link to HTTP documentation'),
(2, 18, 'HTTPS port for secure web server', 'Link to HTTPS documentation'),
(3, 18, 'SSH port for secure remote access', 'Link to SSH documentation'),
(4, 18, 'RDP port for remote desktop access', 'Link to RDP documentation'),
(5, 18, 'SMTP port for email communication', 'Link to SMTP documentation'),
(6, 18, 'POP3 port for email retrieval', 'Link to POP3 documentation'),
(7, 18, 'FTP port for file transfer', 'Link to FTP documentation'),
(8, 18, 'DNS port for domain name resolution', 'Link to DNS documentation'),
(9, 18, 'SNMP port for network management', 'Link to SNMP documentation'),
(10, 18, 'SQL port for database communication', 'Link to SQL documentation'),

-- Asset ID 19
(1, 19, 'HTTP port for web server', 'Link to HTTP documentation'),
(2, 19, 'HTTPS port for secure web server', 'Link to HTTPS documentation'),
(3, 19, 'SSH port for secure remote access', 'Link to SSH documentation'),
(4, 19, 'RDP port for remote desktop access', 'Link to RDP documentation'),
(5, 19, 'SMTP port for email communication', 'Link to SMTP documentation'),

-- Asset ID 20
(2, 20, 'HTTPS port for secure web server', 'Link to HTTPS documentation'),
(5, 20, 'SMTP port for email communication', 'Link to SMTP documentation'),
(7, 20, 'FTP port for file transfer', 'Link to FTP documentation'),

-- Asset ID 21
(3, 21, 'SSH port for secure remote access', 'Link to SSH documentation'),
(4, 21, 'RDP port for remote desktop access', 'Link to RDP documentation'),
(6, 21, 'POP3 port for email retrieval', 'Link to POP3 documentation'),
(8, 21, 'DNS port for domain name resolution', 'Link to DNS documentation'),

-- Asset ID 22
(4, 22, 'RDP port for remote desktop access', 'Link to RDP documentation'),
(7, 22, 'FTP port for file transfer', 'Link to FTP documentation'),
(9, 22, 'SNMP port for network management', 'Link to SNMP documentation'),

-- Asset ID 23
(5, 23, 'SMTP port for email communication', 'Link to SMTP documentation'),
(8, 23, 'DNS port for domain name resolution', 'Link to DNS documentation'),
(10, 23, 'SQL port for database communication', 'Link to SQL documentation'),

-- Asset ID 24
(6, 24, 'POP3 port for email retrieval', 'Link to POP3 documentation'),
(9, 24, 'SNMP port for network management', 'Link to SNMP documentation'),
(1, 24, 'HTTP port for web server', 'Link to HTTP documentation'),

-- Asset ID 25
(7, 25, 'FTP port for file transfer', 'Link to FTP documentation'),
(10, 25, 'SQL port for database communication', 'Link to SQL documentation'),

-- Asset ID 26
(8, 26, 'DNS port for domain name resolution', 'Link to DNS documentation'),

-- Asset ID 27
(9, 27, 'SNMP port for network management', 'Link to SNMP documentation'),

-- Asset ID 28
(10, 28, 'SQL port for database communication', 'Link to SQL documentation'),

-- Asset ID 29 (No ports assigned),

-- Asset ID 30
(1, 30, 'HTTP port for web server', 'Link to HTTP documentation'),
(2, 30, 'HTTPS port for secure web server', 'Link to HTTPS documentation');




SELECT * FROM ports_to_asset;








-------------------------------- END OF PORTS TO ASSET TABLE ---------------------------------------




-------------------------------- APPLICATIONS TABLE ---------------------------------------



CREATE TABLE applications (
	"id" 					serial 			PRIMARY KEY,
	"name"					VARCHAR(256),
	"type" 					VARCHAR(256)
);


INSERT INTO applications ("name", "type")
VALUES
('Google Chrome', 'Web Browser'),
('Microsoft Outlook', 'Email Client'),
('Sublime Text', 'Text Editor'),
('VLC Media Player', 'Media Player'),
('MySQL Database', 'Database Software'),
('Adobe Photoshop', 'Graphics Design'),
('Microsoft Project', 'Project Management'),
('Norton Antivirus', 'Antivirus'),
('Visual Studio Code', 'Code Editor'),
('Slack', 'Communication');



SELECT * FROM applications;







-------------------------------- END OF APPLICATIONS TABLE ---------------------------------------





-------------------------------- APPLICATIONS TO ASSET TABLE ---------------------------------------



CREATE TABLE applications_to_asset (
	"application_id" 		INT 			REFERENCES applications(id),
	"asset_id" 				INT 			REFERENCES asset_inventory(id),
	"version"				VARCHAR(256),
	"initial_install"		DATE,
	"upgrade_date"			DATE
);


INSERT INTO applications_to_asset ("application_id", "asset_id", "version", "initial_install", "upgrade_date")
VALUES
-- Asset ID 16
(1, 16, 'v89', '2023-01-01', '2023-03-01'),
(2, 16, 'v2021', '2023-01-05', '2023-02-15'),
(3, 16, 'v4', '2023-02-01', NULL),
(4, 16, 'v3.0', '2023-02-10', NULL),
(5, 16, 'v8.0', '2023-03-01', NULL),
(6, 16, 'v2022', '2023-01-15', '2023-03-01'),
(7, 16, 'v2023', '2023-01-20', NULL),
(8, 16, 'v360', '2023-01-25', NULL),
(9, 16, 'v1.60', '2023-02-15', NULL),
(10, 16, 'v4.14', '2023-02-20', NULL),

-- Asset ID 17
(3, 17, 'v4', '2023-02-01', NULL),
(4, 17, 'v3.0', '2023-02-10', NULL),
(6, 17, 'v2022', '2023-01-15', '2023-03-01'),
(7, 17, 'v2023', '2023-01-20', NULL),
(8, 17, 'v360', '2023-01-25', NULL),
(9, 17, 'v1.60', '2023-02-15', NULL),
(10, 17, 'v4.14', '2023-02-20', NULL),

-- Asset ID 18
(5, 18, 'v8.0', '2023-03-01', NULL),
(6, 18, 'v2022', '2023-01-15', '2023-03-01'),
(7, 18, 'v2023', '2023-01-20', NULL),
(8, 18, 'v360', '2023-01-25', NULL),
(9, 18, 'v1.60', '2023-02-15', NULL),
(10, 18, 'v4.14', '2023-02-20', NULL),

-- Asset ID 19
(1, 19, 'v89', '2023-01-01', '2023-03-01'),
(2, 19, 'v2021', '2023-01-05', '2023-02-15'),
(7, 19, 'v2023', '2023-01-20', NULL),
(8, 19, 'v360', '2023-01-25', NULL),

-- Asset ID 20
(1, 20, 'v89', '2023-01-01', '2023-03-01'),
(2, 20, 'v2021', '2023-01-05', '2023-02-15'),
(9, 20, 'v1.60', '2023-02-15', NULL),
(10, 20, 'v4.14', '2023-02-20', NULL),

-- Asset ID 21
(1, 21, 'v89', '2023-01-01', '2023-03-01'),
(2, 21, 'v2021', '2023-01-05', '2023-02-15'),
(5, 21, 'v8.0', '2023-03-01', NULL),
(6, 21, 'v2022', '2023-01-15', '2023-03-01'),
(7, 21, 'v2023', '2023-01-20', NULL),

-- Asset ID 22
(3, 22, 'v4', '2023-02-01', NULL),
(4, 22, 'v3.0', '2023-02-10', NULL),

-- Asset ID 23
(5, 23, 'v8.0', '2023-03-01', NULL),
(6, 23, 'v2022', '2023-01-15', '2023-03-01'),

-- Asset ID 24
(7, 24, 'v2023', '2023-01-20', NULL),
(8, 24, 'v360', '2023-01-25', NULL),

-- Asset ID 25
(9, 25, 'v1.60', '2023-02-15', NULL),
(10, 25, 'v4.14', '2023-02-20', NULL),

-- Asset ID 26
(1, 26, 'v89', '2023-01-01', '2023-03-01'),
(2, 26, 'v2021', '2023-01-05', '2023-02-15'),

-- Asset ID 27
(3, 27, 'v4', '2023-02-01', NULL),
(4, 27, 'v3.0', '2023-02-10', NULL),

-- Asset ID 28
(5, 28, 'v8.0', '2023-03-01', NULL),
(6, 28, 'v2022', '2023-01-15', '2023-03-01'),

-- Asset ID 29
(7, 29, 'v2023', '2023-01-20', NULL),
(8, 29, 'v360', '2023-01-25', NULL),

-- Asset ID 30
(9, 30, 'v1.60', '2023-02-15', NULL),
(10, 30, 'v4.14', '2023-02-20', NULL);





SELECT * FROM applications_to_asset;







-------------------------------- END OF APPLICATIONS TO ASSET TABLE ---------------------------------------






-------------------------------- SOFTWARE UPDATES TO ASSET TABLE ---------------------------------


CREATE TABLE software_updates_to_asset (
	"id" 					serial 			PRIMARY KEY,
	"asset_id" 				INT 			REFERENCES asset_inventory(id),
	"patch_version"			VARCHAR(256),
	"source" 				VARCHAR(256),
	"model"					VARCHAR(256),
	"OS"					VARCHAR(256),
	"date_reviewed"			DATE,
	"date_installed"		DATE,
	"CHG_ticket"			VARCHAR(256),
	"notes"					VARCHAR(256)
);


INSERT INTO software_updates_to_asset ("asset_id", "patch_version", "source", "model", "OS", "date_reviewed", "date_installed", "CHG_ticket", "notes")
VALUES
-- Asset ID 16
(16, 'KB1111', 'VendorA', 'ModelX', 'Windows Server 2019', '2023-01-01', '2023-01-05', 'CHG111111', 'Security patch'),
(16, 'KB2222', 'VendorB', 'ModelY', 'Windows Server 2019', '2023-02-01', '2023-02-05', 'CHG222222', 'Performance improvement'),
(16, 'KB1212', 'VendorA', 'ModelX', 'Windows Server 2019', '2023-01-02', '2023-01-06', 'CHG123456', 'Security patch'),
(16, 'KB2323', 'VendorB', 'ModelY', 'Windows Server 2019', '2023-02-02', '2023-02-06', 'CHG234567', 'Performance improvement'),
(16, 'KB7070', 'VendorP', 'ModelX', 'Windows Server 2016', '2023-07-10', '2023-07-15', 'CHG707070', 'Compatibility update'),
(16, 'KB8080', 'VendorQ', 'ModelY', 'Windows Server 2016', '2023-08-01', '2023-08-05', 'CHG808080', 'Bug fix'),
(16, 'KB8787', 'VendorP', 'ModelX', 'Windows Server 2016', '2023-07-11', '2023-07-16', 'CHG707070', 'Compatibility update'),
(16, 'KB9898', 'VendorQ', 'ModelY', 'Windows Server 2016', '2023-08-02', '2023-08-06', 'CHG808080', 'Bug fix'),


-- Asset ID 17
(17, 'KB3333', 'VendorC', 'ModelZ', 'Windows Server 2019', '2023-03-01', '2023-03-05', 'CHG333333', 'Bug fix'),
(17, 'KB4444', 'VendorD', 'ModelA', 'Linux CentOS 7', '2023-01-10', '2023-01-15', 'CHG111111', 'Security patch'),
(17, 'KB3434', 'VendorC', 'ModelZ', 'Windows Server 2019', '2023-03-02', '2023-03-06', 'CHG345678', 'Bug fix'),
(17, 'KB4545', 'VendorD', 'ModelA', 'Linux CentOS 7', '2023-01-11', '2023-01-16', 'CHG444444', 'Security patch'),

-- Asset ID 18
(18, 'KB5555', 'VendorE', 'ModelB', 'Windows 10', '2023-02-10', '2023-02-15', 'CHG555555', 'Feature enhancement'),
(18, 'KB5656', 'VendorE', 'ModelB', 'Windows 10', '2023-02-11', '2023-02-16', 'CHG555555', 'Feature enhancement'),

-- Asset ID 19
(19, 'KB6666', 'VendorF', 'ModelC', 'Ubuntu 20.04', '2023-03-10', '2023-03-15', 'CHG666666', 'Compatibility update'),
(19, 'KB7777', 'VendorG', 'ModelD', 'Ubuntu 20.04', '2023-04-10', '2023-04-15', 'CHG333333', 'Bug fix'),
(19, 'KB6767', 'VendorF', 'ModelC', 'Ubuntu 20.04', '2023-03-11', '2023-03-16', 'CHG666666', 'Compatibility update'),
(19, 'KB7878', 'VendorG', 'ModelD', 'Ubuntu 20.04', '2023-04-11', '2023-04-16', 'CHG345678', 'Bug fix'),

-- Asset ID 20
(20, 'KB8888', 'VendorH', 'ModelE', 'Windows Server 2016', '2023-02-20', '2023-02-25', 'CHG111111', 'Security patch'),
(20, 'KB8989', 'VendorH', 'ModelE', 'Windows Server 2016', '2023-02-21', '2023-02-26', 'CHG123456', 'Security patch'),

-- Asset ID 21
(21, 'KB9999', 'VendorI', 'ModelF', 'Windows Server 2016', '2023-03-20', '2023-03-25', 'CHG222222', 'Performance improvement'),
(21, 'KB1010', 'VendorJ', 'ModelG', 'Windows Server 2016', '2023-04-20', '2023-04-25', 'CHG333333', 'Bug fix'),
(21, 'KB1010', 'VendorI', 'ModelF', 'Windows Server 2016', '2023-03-21', '2023-03-26', 'CHG234567', 'Performance improvement'),
(21, 'KB2121', 'VendorJ', 'ModelG', 'Windows Server 2016', '2023-04-21', '2023-04-26', 'CHG101010', 'Bug fix'),

-- Asset ID 22
(22, 'KB2020', 'VendorK', 'ModelH', 'Windows 10', '2023-05-01', '2023-05-05', 'CHG111111', 'Security patch'),
(22, 'KB3232', 'VendorK', 'ModelH', 'Windows 10', '2023-05-02', '2023-05-06', 'CHG444444', 'Security patch'),

-- Asset ID 23
(23, 'KB3030', 'VendorL', 'ModelI', 'Linux CentOS 7', '2023-05-10', '2023-05-15', 'CHG222222', 'Performance improvement'),
(23, 'KB4343', 'VendorL', 'ModelI', 'Linux CentOS 7', '2023-05-11', '2023-05-16', 'CHG234567', 'Performance improvement'),

-- Asset ID 24
(24, 'KB4040', 'VendorM', 'ModelJ', 'Windows Server 2019', '2023-06-01', '2023-06-05', 'CHG404040', 'Bug fix'),
(24, 'KB5454', 'VendorM', 'ModelJ', 'Windows Server 2019', '2023-06-02', '2023-06-06', 'CHG101010', 'Bug fix'),

-- Asset ID 25
(25, 'KB5050', 'VendorN', 'ModelK', 'Ubuntu 20.04', '2023-06-10', '2023-06-15', 'CHG111111', 'Security patch'),
(25, 'KB6565', 'VendorN', 'ModelK', 'Ubuntu 20.04', '2023-06-11', '2023-06-16', 'CHG505050', 'Security patch'),

-- Asset ID 26
(26, 'KB6060', 'VendorO', 'ModelL', 'Windows 10', '2023-07-01', '2023-07-05', 'CHG606060', 'Feature enhancement'),
(26, 'KB7676', 'VendorO', 'ModelL', 'Windows 10', '2023-07-02', '2023-07-06', 'CHG234567', 'Performance improvement'),

-- Asset ID 27
(27, 'KB7070', 'VendorP', 'ModelM', 'Windows Server 2016', '2023-07-10', '2023-07-15', 'CHG707070', 'Compatibility update'),
(27, 'KB8080', 'VendorQ', 'ModelN', 'Windows Server 2016', '2023-08-01', '2023-08-05', 'CHG808080', 'Bug fix'),
(27, 'KB8787', 'VendorP', 'ModelM', 'Windows Server 2016', '2023-07-11', '2023-07-16', 'CHG707070', 'Compatibility update'),
(27, 'KB9898', 'VendorQ', 'ModelN', 'Windows Server 2016', '2023-08-02', '2023-08-06', 'CHG808080', 'Bug fix'),
(27, 'KB1111', 'VendorA', 'ModelM', 'Windows Server 2019', '2023-01-01', '2023-01-05', 'CHG111111', 'Security patch'),
(27, 'KB2222', 'VendorB', 'ModelN', 'Windows Server 2019', '2023-02-01', '2023-02-05', 'CHG222222', 'Performance improvement'),
(27, 'KB1212', 'VendorA', 'ModelM', 'Windows Server 2019', '2023-01-02', '2023-01-06', 'CHG123456', 'Security patch'),
(27, 'KB2323', 'VendorB', 'ModelN', 'Windows Server 2019', '2023-02-02', '2023-02-06', 'CHG234567', 'Performance improvement'),

-- Asset ID 28
(28, 'KB9090', 'VendorR', 'ModelO', 'Linux CentOS 7', '2023-08-10', '2023-08-15', 'CHG111111', 'Security patch'),
(28, 'KB0909', 'VendorR', 'ModelO', 'Linux CentOS 7', '2023-08-11', '2023-08-16', 'CHG444444', 'Security patch'),

-- Asset ID 29
(29, 'KB1010', 'VendorS', 'ModelP', 'Ubuntu 20.04', '2023-09-01', '2023-09-05', 'CHG222222', 'Performance improvement'),
(29, 'KB2020', 'VendorS', 'ModelP', 'Ubuntu 20.04', '2023-09-02', '2023-09-06', 'CHG234567', 'Performance improvement'),

-- Asset ID 30
(30, 'KB1111', 'VendorT', 'ModelQ', 'Windows Server 2019', '2023-09-10', '2023-09-15', 'CHG808080', 'Bug fix'),
(30, 'KB3131', 'VendorT', 'ModelQ', 'Windows Server 2019', '2023-09-11', '2023-09-16', 'CHG333333', 'Bug fix'),
(30, 'KB2020', 'VendorS', 'ModelQ', 'Windows Server 2019', '2023-09-02', '2023-09-06', 'CHG234567', 'Performance improvement');



SELECT * FROM software_updates_to_asset;





-------------------------------- END OF SOFTWARE UPDATES TO ASSET TABLE ---------------------------------






-------------------------------- CHANGE CONTROLS TABLE ---------------------------------

CREATE TABLE change_controls (
	"id" 					serial 			PRIMARY KEY,
	"CHG_number" 			VARCHAR(256),
	"CHG_date"		 		DATE,
	"security_update"		VARCHAR(12),
	"security_review_date"  DATE,
	"description"			VARCHAR(256),
	"test_approve_date"		DATE,
	"test_install_date"		DATE,
	"test_worknotes"		VARCHAR(256),
	"before_test_ss"		VARCHAR(256),
	"after_test_ss"			VARCHAR(256),
	"prod_approve_date"		DATE,
	"prod_install_date"		DATE,
	"prod_worknotes"		VARCHAR(256),
	"before_prod_ss"		VARCHAR(256),
	"after_prod_ss"		VARCHAR(256)
);


INSERT INTO change_controls ("CHG_number", "CHG_date")
SELECT "CHG_ticket", MIN("date_reviewed") AS "CHG_date"
FROM software_updates_to_asset
GROUP BY "CHG_ticket"
ORDER BY "CHG_ticket";

UPDATE change_controls
SET "security_update" = 'Yes'
WHERE "id" IN (1, 2, 3, 4, 7, 9, 12, 15);

UPDATE change_controls
SET "security_update" = 'No'
WHERE "id" IN (5, 6, 8, 10, 11, 12, 13, 14);


UPDATE change_controls
SET "security_review_date" = '2023-01-01'
WHERE "security_update" = 'Yes';


UPDATE change_controls
SET "description" = 'This is a description of the work done by the change control....';

UPDATE change_controls
SET "test_approve_date" = '2023-01-01',
"test_install_date" = '2023-01-07',
"prod_approve_date" = '2023-01-14',
"prod_install_date" = '2023-01-27',
"test_worknotes" = 'Test environment successfully passed with no reported issues.',
"prod_worknotes" = 'Production environment successfully updated with no issues.';

UPDATE change_controls
SET "before_test_ss" = 'example.pdf',
"after_test_ss" = 'index.pdf',
"before_prod_ss" = 'magic.pdf',
"after_prod_ss" = 'sample.pdf';

SELECT * FROM change_controls ORDER BY "CHG_date";







-------------------------------- END OF CHANGE CONTROLS TABLE ---------------------------------






