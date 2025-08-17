<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * App\Models\Task
 *
 * @property int $id
 * @property string $description
 * @property string $due_date
 * @property string $status
 * @property string $related_type
 * @property int $related_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read string $related_name
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Task newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Task newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Task query()
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereRelatedId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereRelatedType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereUpdatedAt($value)
 * @method static \Database\Factories\TaskFactory factory($count = null, $state = [])
 * @method static Task create(array $attributes = [])
 * @method static Task firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'description',
        'due_date',
        'status',
        'related_type',
        'related_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'due_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var list<string>
     */
    protected $appends = ['related_name'];

    /**
     * Get the related name accessor.
     */
    public function getRelatedNameAttribute(): string
    {
        if ($this->related_type === 'contact') {
            $contact = Contact::find($this->related_id);
            return $contact ? $contact->name : 'Unknown Contact';
        } elseif ($this->related_type === 'deal') {
            $deal = Deal::find($this->related_id);
            return $deal ? $deal->name : 'Unknown Deal';
        }
        
        return 'Unknown';
    }

    /**
     * Get the contact if this task is related to a contact.
     */
    public function contact()
    {
        return $this->related_type === 'contact' 
            ? $this->belongsTo(Contact::class, 'related_id')
            : null;
    }

    /**
     * Get the deal if this task is related to a deal.
     */
    public function deal()
    {
        return $this->related_type === 'deal' 
            ? $this->belongsTo(Deal::class, 'related_id')
            : null;
    }
}