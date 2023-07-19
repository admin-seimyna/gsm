<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class DevicesRequest extends FormRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
    /**
     * @return string|null
     */
    public function getSortColumn(): ?string
    {
        $column = $this->query('sort', null);
        if (!$column) {
            return null;
        }

        return in_array($column, ['name', 'imei', 'users_count']) ? $column : null;
    }

    /**
     * @return string
     */
    public function getSortType(): string
    {
        return $this->query('sort-type', 'asc');
    }
}
