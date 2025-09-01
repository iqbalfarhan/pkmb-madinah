<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $document)
    {
        return $document;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Media $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Media $document)
    {
        $document->delete();
    }
}
