from database_helper import Database
from decimal import Decimal


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

    # return the median sleep, exercise and work times for all employees
    def median_survey(self):
        columns = ["exercise_time", "social_interaction_time", "work_time", "sleep_time"]
        medians = {}
        for col in columns:
            self.database.fetch_all("SET @rowindex_ex := -1")
            med = self.database.fetch_all(f"""    
                                        SELECT
                                        CAST(AVG(g.{col}) AS DOUBLE)
                                        FROM
                                        (SELECT @rowindex_ex:=@rowindex_ex + 1 AS rowindex_ex,
                                                dayroutine.{col} AS {col}
                                            FROM dayroutine
                                            ORDER BY dayroutine.{col}) AS g
                                        WHERE
                                        g.rowindex_ex IN (FLOOR(@rowindex_ex / 2) , CEIL(@rowindex_ex / 2))
                                    """
            )
            median = med[0][f"CAST(AVG(g.{col}) AS DOUBLE)"]
            medians.update(
                {
                    col: median,
                }  
            )
        return medians

