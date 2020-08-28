<?php

namespace App\Console\Helpers;

/**
 * Provides some simple validation and error printing functionality for custom Artisan commands.
 */
class Validation
{
    /**
     * Validate the command parameters and return any error messages, otherwise return null.
     * 
     * @param array $values The array of field => value pairs.
     * @param array $rules The rules used to validate the given values.
     */
    public static function get_errors($values, $rules)
    {
        $validator = \Validator::make($values, $rules);
        return $validator->fails() ? $validator->errors() : null;
    }

    /**
     * Iterates over the given array of errors and prints each one on a separate line.
     * 
     * @param array $errors The array of error messages to print.
     */
    public static function print_errors($errors)
    {
        if(!is_null($errors) && is_array($errors) && !empty($errors)) {
            array_walk($errors, function($error) {
                echo "$error\n";
            });
        }
    }
}
