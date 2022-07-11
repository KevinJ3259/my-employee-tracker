INSERT INTO department
    (department_id, department_name)
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
    ('Software Engineer', '120000', 3),
    ('Account Manager', '160000', 4),
    ('Accountant', '125000', 5),
    ('Legal Team Lead', '250000', 6),
    ('Lawyer', '190000', 7);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Chan', 1, 213),
    ('Ashley', 'Rodriguez', 2, 323),
    ('Kevin', 'Tupik', 3, 913),
    ('Kunal', 'Singh', 4, 816),
    ('Malia', 'Brown', 5, 785),
    ('Sarah', 'Lourd', 6, 818),
    ('Tom', 'Allen', 7, 346);

