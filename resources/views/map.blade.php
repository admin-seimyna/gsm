@extends('app')
@section('content')
<div class="devices-panel shadow rounded">
    <div class="devices-panel__header d-flex flex-column px-4 py-3 shadow-sm">
        <div class="d-flex align-items-center justify-content-between">
            <span class="h5">Devices</span>
            <div class="flex">
                <span class="h5 ml-2 devices-count">0</span>
            </div>
        </div>
    </div>
    <div class="devices-panel__list list-group px-4 py-2"></div>
    <div class="d-flex align-items-center justify-content-end p-3">
        <button class="btn btn-primary add-device-btn">+ Add device</button>
    </div>
</div>
<div class="map"></div>

<div class="modal fade" id="device-form-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">New device</h5>
                <button type="button" class="btn-close modal-close"></button>
            </div>
            <div class="modal-body">
                <form method="post" class="device-form">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" name="name" class="form-control" placeholder="Insert name...">
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-12">
                                <label for="imei" class="form-label">Imei</label>
                                <input type="text" name="imei" class="form-control" placeholder="Insert IMEI...">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-6">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Lat</span>
                                    <input type="text" name="lat" class="form-control" placeholder="Latitude..." aria-label="Latitude">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Lng</span>
                                    <input type="text" name="lng" class="form-control" placeholder="Longitude..." aria-label="Longitude">
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3 border-top py-2">
                            <div class="col-12 d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary modal-close me-2">Cancel</button>
                                <button type="submit" class="btn btn-primary save-device-btn">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
