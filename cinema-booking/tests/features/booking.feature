Feature: Cinema Booking

  Scenario: The today booking
    Given I am on the cinema homepage and today day is chosen
    When I select the last available session
    And I select a standard seat
    And I click the book button
    Then I should see a booking confirmation

    Scenario: The future booking
    Given I am on the cinema homepage
    When I select the last available day
    And I select the last available session
    And I select a standard seat
    And I click the book button
    Then I should see a booking confirmation

  Scenario: Impossible to book a reserved seat
    Given I am on the cinema homepage and today day is chosen
    When I select the last available session
    And I select a reserved seat
    And I click the book button
    Then the book button should remain disabled