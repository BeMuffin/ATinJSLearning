Feature:

  Background:
    Given I open "Login" page
    Then I should be on "Login" page and page is fully loaded
    And I login with default user
    And I should be on "Home" page
    And I generate demo data

  Scenario Outline: Edit Launch
    When I click on "Launches menu button" on "Dashboard Menu" component
    And I should be on "Launches" page
    And I wait until demo launches are loaded
    And I click on "Select all launches checkbox" on "Launches" page
    And I wait for "5" seconds
    And I select "Edit" option from "Actions container" container of "Actions dropdown" dropdown on "Launches" page
    And I click on "Add new attribute button" on "EditLaunch" modal
    When I enter the following attributes on "EditLaunch" modal:
        | Env     | Value   |
        | <Env>   | <Value> |

  Examples:
      | Env      | Value  |
      | preprod  | demo1  |
      | nonprod  | demo2  |
      | prod     | demo3  |

