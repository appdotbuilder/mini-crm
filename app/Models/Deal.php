<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Deal
 *
 * @property int $id
 * @property string $name
 * @property string $amount
 * @property string $stage
 * @property int $contact_id
 * @property int|null $company_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Contact $contact
 * @property-read \App\Models\Company|null $company
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Task> $tasks
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Deal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Deal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Deal query()
 * @method static \Illuminate\Database\Eloquent\Builder|Deal whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Deal whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Deal whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Deal whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Deal whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Deal whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Deal whereStage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Deal whereUpdatedAt($value)
 * @method static \Database\Factories\DealFactory factory($count = null, $state = [])
 * @method static Deal create(array $attributes = [])
 * @method static Deal firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Deal extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'amount',
        'stage',
        'contact_id',
        'company_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the contact that owns the deal.
     */
    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * Get the company that owns the deal.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the tasks related to this deal.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'related_id')->where('related_type', 'deal');
    }
}