import json
import os
from pprint import pprint

from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

options = Options()
options.add_argument("--headless")

driver = webdriver.Chrome(executable_path=os.path.abspath('D:/Programs/Selenium/chromedriver.exe'), options=options)
driver.get('https://urnik.fri.uni-lj.si/timetable/fri-2021_2022-zimski-1-1')

classes_path = '/html/body/div/div/div/table/tbody/tr/td[4]/div/a'
classes = driver.find_elements(By.XPATH, classes_path)

teachers_dict = {}
for i in range(0, len(classes)):
    class_name = classes[i].text
    print(class_name)

    classes[i].click()
    try:
        groups_set = set()

        columns = WebDriverWait(driver, 1).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, 'grid-day-column'))
        )

        for column in columns:
            column: WebElement
            day = column.get_attribute('style').split(':')[1].split('/')[0]
            day = day.strip()

            entries = column.find_elements(By.CLASS_NAME, 'grid-entry')

            for entry in entries:
                entry: WebElement

                entry_type = entry.find_elements(By.CLASS_NAME, 'entry-type')

                tmp = entry.find_elements(By.CLASS_NAME, 'link-teacher')
                if len(tmp) < 1:
                    print(f'Skipping entry for {class_name}, because entry\'s teacher is not specified.')
                    continue

                teacher = tmp[0].text
                groups = entry.find_elements(By.CLASS_NAME, 'link-group')
                classroom = entry.find_elements(By.CLASS_NAME, 'link-classroom')

                if teacher not in teachers_dict:
                    teachers_dict[teacher] = {}

                if class_name not in teachers_dict[teacher]:
                    teachers_dict[teacher][class_name] = {}
                    teachers_dict[teacher][class_name]['professor'] = False

                    teachers_dict[teacher][class_name]['lectures'] = {}
                    teachers_dict[teacher][class_name]['lectures']['dayMON'] = 0
                    teachers_dict[teacher][class_name]['lectures']['dayTUE'] = 0
                    teachers_dict[teacher][class_name]['lectures']['dayWED'] = 0
                    teachers_dict[teacher][class_name]['lectures']['dayTHU'] = 0
                    teachers_dict[teacher][class_name]['lectures']['dayFRI'] = 0

                    teachers_dict[teacher][class_name]['labs'] = {}
                    teachers_dict[teacher][class_name]['labs']['dayMON'] = 0
                    teachers_dict[teacher][class_name]['labs']['dayTUE'] = 0
                    teachers_dict[teacher][class_name]['labs']['dayWED'] = 0
                    teachers_dict[teacher][class_name]['labs']['dayTHU'] = 0
                    teachers_dict[teacher][class_name]['labs']['dayFRI'] = 0

                if entry_type[0].text == '| P':
                    teachers_dict[teacher][class_name]['professor'] = True
                    teachers_dict[teacher][class_name]['lectures'][day] += 1
                else:
                    teachers_dict[teacher][class_name]['labs'][day] += 1

    except TimeoutException:
        print(f'No columns found for {class_name}.')

    finally:
        driver.back()
        classes = WebDriverWait(driver, 1).until(EC.presence_of_all_elements_located((By.XPATH, classes_path)))

driver.close()
pprint(teachers_dict)
with open('data/teachers_graph_new.json', 'w', encoding='utf-8') as f:
    json.dump(teachers_dict, f, ensure_ascii=False, indent=4)
