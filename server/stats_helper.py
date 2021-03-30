from database_helper import Database


class StatsHelper():

    def __init__(self):
        self.database = Database()
        print("Stats Helping initialising!")

    def select_all_employee(self):
        result = self.database.fetch_all("SELECT * FROM employeedata")
        return result

    def select_all(self):
        result = self.database.fetch_all("SELECT * FROM dayroutine limit 0,7")
        return result

    def join_all(self):
        result = self.database.fetch_all("SELECT * FROM dayroutine as a left join employeedata b on a.employee_id = b.employee_id")
        return result

    # return each employee with their joined dayroutines in order
    def per_employee(self, employee_id):
        result = self.database.fetch_all(f"""
                                            SELECT * FROM dayroutine AS a WHERE EXISTS (
	                                            SELECT 1 FROM dayroutine
                                                WHERE a.employee_id = {employee_id}
                                            );
                                            """
        )      
        return result


    # return the mean stats for the selected employee
    def mean_stats(self, employee_id):
        return None
