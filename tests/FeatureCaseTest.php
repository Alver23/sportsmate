<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;

abstract class FeatureCaseTest extends TestCase
{
    public function seeErrors(array $fields)
    {
        foreach ($fields as $name => $errors) {
            foreach ((array) $errors as $message) {
                $this->seeInElement(
                    "#field_{$name}.has-error .help-block", $message
                );
            }
        }
    }

    public function defaultUser(array $attributes = [])
    {
        if ($this->defaultUser){
            return $this->defaultUser;
        }
        return $this->defaultUser = factory(\SportsMate\Models\User::class)->create($attributes);
    }
}