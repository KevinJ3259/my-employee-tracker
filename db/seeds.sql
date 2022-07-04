INSERT INTO department
    (department_id, department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (role_id, title, salary, department_id)
VALUES
    ('Salesperson', '80000'),
    ('Engineer', '150000'),
    ('Software Engineer', '120000'),
    ('Account Manager', '160000'),
    ('Accountant', '125000'),
    ('Legal Team Lead', '250000'),
    ('Lawyer', '190000');

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Chan'),
    ('Ashley', 'Rodriguez')
    ('Kevin', 'Tupik'),
    ('Kunal', 'Singh'),
    ('Malia', 'Brown'),
    ('Sarah', 'Lourd'),
    ('Tom', 'Allen');

