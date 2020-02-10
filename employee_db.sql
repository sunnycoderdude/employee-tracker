DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
  );
  
CREATE TABLE role (
 id INT NOT NULL AUTO_INCREMENT,
 title VARCHAR(30),
 salary DECIMAL(10,2),
 department_id INTEGER(4),
 PRIMARY KEY (id),
 FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER(4),
  manager_id INTEGER(4) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUES ('sales'), ('engineering'), ('finance'), ('legal');

INSERT INTO role (title, salary, department_id)
VALUES ('salesperson', 100000.00, 1), ('sales lead', 150000.00, 1), ('software guy', 900000.00, 2), ('software lead', 170000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('accountant', 60000.00, 3), ('controller', 150000.00, 3), ('legal guy', 900000.00, 4), ('general counsel', 170000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('bob','ross',2,null), ('raubert','guy',1,1), 
('manny','lopez',4,null),('yolanda','swiggens',3,3),
('john','man',3,3),('softee','coder',3,3),
('chocolate','milk',6,null),('ashley','stewart',5,7),
('fifty','cent',8,null),('filet','mignon',7,9)

