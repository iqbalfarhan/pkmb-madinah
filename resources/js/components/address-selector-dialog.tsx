import { addressData } from '@/lib/enums';
import { implodeAddress } from '@/lib/utils';
import { FC, useState } from 'react';
import FormControl from './form-control';
import SubmitButton from './submit-button';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

type Props = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const AddressSelectorDialog: FC<Props> = ({ value, onValueChange }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const [provinsi, setProvinsi] = useState('Kalimantan Timur');
  const [kabupaten, setKabupaten] = useState('Balikpapan');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kodepos, setKodepos] = useState('');
  const [jalan, setJalan] = useState('');
  const [rt, setRt] = useState('');
  const [rw, setRw] = useState('');

  const provinsiList = [...new Set(addressData.map((item) => item.provinsi))];
  const kabupatenList = [...new Set(addressData.filter((item) => item.provinsi === provinsi).map((item) => item.kabupaten))];
  const kecamatanList = [...new Set(addressData.filter((item) => item.kabupaten === kabupaten).map((item) => item.kecamatan))];
  const kelurahanList = [...new Set(addressData.filter((item) => item.kecamatan === kecamatan).map((item) => item.kelurahan))];

  const handleKelurahanChange = (value: string) => {
    setKelurahan(value);
    const data = addressData.find((item) => item.kelurahan === value && item.kecamatan === kecamatan);
    if (data) setKodepos(data.kodepos);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Textarea value={value} onChange={(e) => onValueChange?.(e.target.value)} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tempat Tinggal</DialogTitle>
          <DialogDescription>Alamat lengkap tempat tinggal</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 py-4">
          <FormControl label="Provinsi">
            <Select
              value={provinsi}
              onValueChange={(value) => {
                setProvinsi(value);
                setKabupaten('');
                setKecamatan('');
                setKelurahan('');
                setKodepos('');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih provinsi" />
              </SelectTrigger>
              <SelectContent>
                {provinsiList.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormControl label="Kabupaten / Kota">
            <Select
              value={kabupaten}
              onValueChange={(value) => {
                setKabupaten(value);
                setKecamatan('');
                setKelurahan('');
                setKodepos('');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kabupaten / kota" />
              </SelectTrigger>
              <SelectContent>
                {kabupatenList.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormControl label="Kecamatan">
            <Select
              value={kecamatan}
              onValueChange={(value) => {
                setKecamatan(value);
                setKelurahan('');
                setKodepos('');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kecamatan" />
              </SelectTrigger>
              <SelectContent>
                {kecamatanList.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormControl label="Kelurahan">
            <Select value={kelurahan} onValueChange={handleKelurahanChange}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelurahan" />
              </SelectTrigger>
              <SelectContent>
                {kelurahanList.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormControl label="Jalan / Perumahan & No. Rumah">
            <Input placeholder="Contoh: Jl. Durian No. 88" value={jalan} onChange={(e) => setJalan(e.target.value)} />
          </FormControl>

          <FormControl label="RT">
            <Input placeholder="Misal: 01" value={rt} onChange={(e) => setRt(e.target.value)} />
          </FormControl>

          <FormControl label="RW">
            <Input placeholder="Misal: 04" value={rw} onChange={(e) => setRw(e.target.value)} />
          </FormControl>

          <FormControl label="Kode Pos">
            <Input placeholder="Kode Pos" value={kodepos} readOnly />
          </FormControl>
        </div>
        <DialogFooter className="flex flex-1 justify-between">
          <DialogClose asChild>
            <Button variant={'secondary'}>Batal</Button>
          </DialogClose>
          <SubmitButton
            onClick={() => {
              const address = implodeAddress(provinsi, kabupaten, kecamatan, kelurahan, jalan, rt, rw, kodepos);
              onValueChange?.(address);
              setOpenDialog(false);
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressSelectorDialog;
