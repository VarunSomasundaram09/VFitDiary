package com.vfitdiary.util;

import java.time.LocalDate;
import java.util.List;

/**
 * Pure streak-calculation logic, kept separate from the service layer
 * for testability — same pattern as the other calculators.
 */
public final class CalendarStreakCalculator {

    private CalendarStreakCalculator() {}

    public record Streaks(int currentStreak, int longestStreak) {}

    /**
     * @param sortedDistinctDates activity dates, sorted ascending, no duplicates
     * @param today the reference "today" date (passed in for testability)
     */
    public static Streaks calculate(List<LocalDate> sortedDistinctDates, LocalDate today) {
        if (sortedDistinctDates.isEmpty()) {
            return new Streaks(0, 0);
        }

        int longest = 1;
        int run = 1;
        for (int i = 1; i < sortedDistinctDates.size(); i++) {
            LocalDate prev = sortedDistinctDates.get(i - 1);
            LocalDate curr = sortedDistinctDates.get(i);
            if (curr.equals(prev.plusDays(1))) {
                run++;
            } else {
                longest = Math.max(longest, run);
                run = 1;
            }
        }
        longest = Math.max(longest, run);

        // Current streak only counts if the most recent activity was today or
        // yesterday — otherwise the streak has already been broken.
        LocalDate mostRecent = sortedDistinctDates.get(sortedDistinctDates.size() - 1);
        int current = 0;
        if (!mostRecent.isBefore(today.minusDays(1))) {
            current = 1;
            for (int i = sortedDistinctDates.size() - 2; i >= 0; i--) {
                LocalDate curr = sortedDistinctDates.get(i);
                LocalDate next = sortedDistinctDates.get(i + 1);
                if (curr.equals(next.minusDays(1))) {
                    current++;
                } else {
                    break;
                }
            }
        }

        return new Streaks(current, longest);
    }
}
