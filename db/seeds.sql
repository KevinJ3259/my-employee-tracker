INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Manager');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Salesperson', '80000', 1),
    ('Engineer', '150000', 2),
    ('Software Engineer', '120000', 2),
    ('Account Manager', '160000', 3),
    ('Accountant', '125000', 3),
    ('Legal Team Lead', '250000', 4),
    ('Lawyer', '190000', 4),
    ('Sales Manager', '100000', 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Chan', 1, 8), -- NOTE: NULL means no manager.
    ('Ashley', 'Rodriguez', 2, NULL),
    ('Kevin', 'Tupik', 3, 2), -- NOTE: manager_id of 2 means Ashley is  manager.
    ('Kunal', 'Singh', 4, NULL),
    ('Malia', 'Brown', 5, 4),
    ('Sarah', 'Lourd', 6, Null),
    ('Tom', 'Allen', 7, 6),
    ('John', 'Doe', 8, Null);

