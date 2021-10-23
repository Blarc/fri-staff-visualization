import json
import os

from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait

options = Options()
options.add_argument("--headless")

driver = webdriver.Chrome(executable_path=os.path.abspath('D:/Programs/Selenium/chromedriver.exe'), options=options)
driver.get('https://urnik.fri.uni-lj.si/timetable/fri-2021_2022-zimski-1-1')

classes_path = '/html/body/div/div/div/table/tbody/tr/td[4]/div/a'
classes = driver.find_elements(By.XPATH, classes_path)

classes_list = []
for i in range(0, len(classes)):
    class_name = classes[i].text
    print(class_name)
    classes[i].click()

    try:

        entries = WebDriverWait(driver, 1).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, 'grid-entry'))
        )
        entry = entries[0]
        entry_subject = entry.find_element(By.CLASS_NAME, 'link-subject')
        class_short: str = entry_subject.text.split('_')[0]

        if class_short.isspace() or class_short == '':
            for word in class_name.split(' '):
                class_short += word[0].upper()

        if class_short.__contains__('('):
            class_short = class_short.split('(')[0]

        id_ = class_name.split(' ')[-1][1:-1]

        print(class_short)

        classes_list.append({'name': class_name, 'short': class_short, 'id': id_, 'size': len(entries)})

    except TimeoutException:
        print(f'No entries found for {class_name}.')

    finally:
        driver.back()
        classes = WebDriverWait(driver, 1).until(EC.presence_of_all_elements_located((By.XPATH, classes_path)))

driver.close()
with open('data/classes.json', 'w', encoding='utf-8') as f:
    json.dump(classes_list, f, ensure_ascii=False, indent=4)
